import './style.scss'
import { OfferCardTileProps } from './interface'
import classNames from 'classnames'

const OfferCardTile = ({ className, children, onCardClick }: OfferCardTileProps) => {
  return (
    <button className={classNames('offer-card-tile', className)} onClick={onCardClick}>
      {children}
    </button>
  )
}

export default OfferCardTile
