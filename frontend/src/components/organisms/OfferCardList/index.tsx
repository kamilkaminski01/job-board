import OffersGridLayout from 'components/atoms/OffersGridLayout'
import { OfferCardListProps } from './interface'
import OfferCard from 'components/molecules/OfferCard'

const OfferCardList = ({ offers, isLoading }: OfferCardListProps) => {
  if (isLoading) return <div>Loading...</div>

  return (
    <OffersGridLayout>
      {offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </OffersGridLayout>
  )
}

export default OfferCardList
