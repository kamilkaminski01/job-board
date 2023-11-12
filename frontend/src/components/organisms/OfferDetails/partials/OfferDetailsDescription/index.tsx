import './style.scss'
import { OfferDetailsDescriptionProps } from './interface'
import Tile from 'components/atoms/Tile'
import Button from 'components/atoms/Button'
import { useModals } from 'providers/modals/context'
import DescriptionModal from 'components/organisms/OfferDetails/modals/DescriptionModal'

const OfferDetailsDescription = ({ title, description }: OfferDetailsDescriptionProps) => {
  const { openModal } = useModals()

  const openDescriptionModal = () => {
    openModal(<DescriptionModal title={title} description={description} />)
  }

  return (
    <Tile shadow="light">
      <div className="offer-details__description">
        <h2>Job description</h2>
        <Button
          className="btn--outline offer-details__description-btn"
          onClick={openDescriptionModal}>
          Show
        </Button>
      </div>
    </Tile>
  )
}

export default OfferDetailsDescription
