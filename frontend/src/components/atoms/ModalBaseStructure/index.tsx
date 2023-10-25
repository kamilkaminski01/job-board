import { useModals } from 'providers/modals/context'
import { ModalBaseStructureProps } from './interface'
import './style.scss'

const ModalBaseStructure = ({ children }: ModalBaseStructureProps) => {
  const { closeModal } = useModals()

  return (
    <div className="modal-base-structure">
      <div className="modal-base-structure__bg" onClick={closeModal} />
      {children}
    </div>
  )
}

export default ModalBaseStructure
