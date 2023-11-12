import Modal from 'components/organisms/Modal'
import { OfferDetailsDescriptionProps } from 'components/organisms/OfferDetails/partials/OfferDetailsDescription/interface'

const DescriptionModal = ({ title, description }: OfferDetailsDescriptionProps) => {
  return <Modal title={title}>{description}</Modal>
}

export default DescriptionModal
