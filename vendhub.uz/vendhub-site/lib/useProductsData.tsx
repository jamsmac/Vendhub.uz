'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { products as fallbackProducts } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'

interface ProductsContextValue {
  products: Product[]
  loading: boolean
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
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
        console.error('Products fetch failed:', error?.message)
        setProducts(fallbackProducts)
      } else {
        setProducts(data as Product[])
      }

      setLoading(false)
    }

    fetchProducts()

    const channel = supabase
      .channel('products-global')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => { fetchProducts() }
      )
      .subscribe((status, err) => {
        if (err) console.error('Products subscription error:', err)
      })

    return () => {
      active = false
      channel.unsubscribe()
    }
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsData() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProductsData must be used within ProductsProvider')
  return ctx
}
