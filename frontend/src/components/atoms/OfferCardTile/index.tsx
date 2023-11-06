import './style.scss'
import { OfferCardTileProps } from './interface'

const OfferCardTile = ({ children, onCardClick }: OfferCardTileProps) => {
  return (
    <button className="offer-card-tile" onClick={onCardClick}>
      {children}
    </button>
  )
}

export default OfferCardTile
