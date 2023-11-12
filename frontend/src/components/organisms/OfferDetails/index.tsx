import './style.scss'
import { OfferDetailsProps } from './interface'
import { BsCodeSlash } from 'react-icons/bs'
import OfferDetailsHeader from './partials/OfferDetailsHeader'
import OfferDetailsCompany from './partials/OfferDetailsCompany'
import OfferDetailsTechStack from './partials/OfferDetailsTechStack'
import OfferDetailsIcons from 'components/organisms/OfferDetails/partials/OfferDetailsIcons'
import OfferDetailsDescription from 'components/organisms/OfferDetails/partials/OfferDetailsDescription'
import Button from 'components/atoms/Button'
import { TbSend } from 'react-icons/tb'

const OfferDetails = ({ offer, setOfferDetails }: OfferDetailsProps) => {
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
            <OfferDetailsHeader {...offer} setOfferDetails={setOfferDetails} />
            <OfferDetailsIcons {...offer} />
            <OfferDetailsCompany {...offer} />
            <OfferDetailsTechStack {...offer} />
            <OfferDetailsDescription title={offer.title} description={offer.description} />
          </div>
          <div className="offer-details__apply">
            <Button className="offer-details__apply-btn">
              <TbSend />
              Apply
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default OfferDetails
