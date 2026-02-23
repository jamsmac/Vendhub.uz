'use client'

import { useModal } from '@/lib/modal-context'
import ProductModal from '@/components/modals/ProductModal'
import MachineModal from '@/components/modals/MachineModal'

export default function ModalRoot() {
  const { modal, closeModal } = useModal()

  if (modal.type === 'product') {
    return <ProductModal product={modal.data} onClose={closeModal} />
  }

  if (modal.type === 'machine') {
    return <MachineModal machine={modal.data} onClose={closeModal} distance={modal.distance} />
  }

  return null
}
