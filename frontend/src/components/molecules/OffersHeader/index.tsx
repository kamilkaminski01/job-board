import './style.scss'
import { OffersHeaderProps } from './interface'
import OffersBanner from 'components/atoms/OffersBanner'
import OfferFilters from 'components/atoms/OfferFilters'

const OffersHeader = ({ offersCount }: OffersHeaderProps) => {
  return (
    <div className="offers-header">
      <OffersBanner />
      <OfferFilters offersCount={offersCount} />
    </div>
  )
}

export default OffersHeader
