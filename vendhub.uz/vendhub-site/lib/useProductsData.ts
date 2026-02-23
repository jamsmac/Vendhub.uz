'use client'

import { useEffect, useState } from 'react'
import { products as fallbackProducts } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'

export function useProductsData() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })

      if (!active) return

      if (error || !data) {
        setProducts(fallbackProducts)
      } else {
        setProducts(data as Product[])
      }

      setLoading(false)
    }

    fetchProducts()

    const channel = supabase
      .channel('products-site')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts()
        }
      )
      .subscribe()

    return () => {
      active = false
      channel.unsubscribe()
    }
  }, [])

  return { products, loading }
}
