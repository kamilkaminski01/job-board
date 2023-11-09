import './style.scss'
import { OfferDetailsProps } from './interface'
import { BsCodeSlash } from 'react-icons/bs'

const OfferDetails = ({ offer }: OfferDetailsProps) => {
  return (
    <div className="offers-content__offer-details">
      {offer.id === undefined ? (
        <div className="offer-details__message">
          <BsCodeSlash />
        </div>
      ) : (
        <div>{offer.title}</div>
      )}
    </div>
  )
}

export default OfferDetails
