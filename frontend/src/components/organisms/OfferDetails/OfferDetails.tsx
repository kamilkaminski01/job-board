import './style.scss'
import { OfferDetailsProps } from './interface'
import { BsCodeSlash } from 'react-icons/bs'
import Tile from 'components/atoms/Tile'
import OfferDetailsHeader from './partials/OfferDetailsHeader'
import OfferDetailsCompany from './partials/OfferDetailsCompany'
import OfferDetailsTechStack from './partials/OfferDetailsTechStack'
import OfferDetailsIcons from 'components/organisms/OfferDetails/partials/OfferDetailsIcons'

const OfferDetails = ({ offer }: OfferDetailsProps) => {
  return (
    <>
      {offer.id === undefined ? (
        <div className="offer-content__no-details">
          <div className="offer-details__message">
            <BsCodeSlash />
            Choose an offer for more details...
          </div>
        </div>
      ) : (
        <div className="offer-content__offer-details">
          <div className="offer-details__items">
            <OfferDetailsHeader {...offer} />
            <OfferDetailsIcons {...offer} />
            <OfferDetailsCompany {...offer} />
            <OfferDetailsTechStack {...offer} />
            <Tile shadow="light">{offer.description}</Tile>
          </div>
        </div>
      )}
    </>
  )
}

export default OfferDetails
