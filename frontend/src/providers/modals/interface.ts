import React from 'react'

export interface ModalsContextProps {
  openModal: (modal: React.ReactElement) => void
  closeModal: () => void
  closeAllModals: () => void
}
