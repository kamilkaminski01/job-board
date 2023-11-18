import Modal from 'components/organisms/Modal'
import { OfferDetailsDescriptionProps } from 'components/organisms/OfferDetails/partials/OfferDetailsDescription/interface'
import parse from 'html-react-parser'

const DescriptionModal = ({ title, description }: OfferDetailsDescriptionProps) => {
  return <Modal title={title}>{parse(description)}</Modal>
}

export default DescriptionModal
