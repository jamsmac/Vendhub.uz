'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import type { Product, Machine } from '@/lib/types'

type ModalState =
  | { type: 'product'; data: Product }
  | { type: 'machine'; data: Machine; distance?: string | null }
  | { type: null; data: null }

interface ModalContextValue {
  modal: ModalState
  openProductModal: (product: Product) => void
  openMachineModal: (machine: Machine, distance?: string | null) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null, data: null })

  const openProductModal = useCallback((product: Product) => {
    setModal({ type: 'product', data: product })
  }, [])

  const openMachineModal = useCallback((machine: Machine, distance?: string | null) => {
    setModal({ type: 'machine', data: machine, distance })
  }, [])

  const closeModal = useCallback(() => {
    setModal({ type: null, data: null })
  }, [])

  return (
    <ModalContext.Provider
      value={{ modal, openProductModal, openMachineModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return ctx
}
