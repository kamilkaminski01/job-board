import OffersGridLayout from 'components/atoms/OffersGridLayout'
import { OfferCardListProps } from './interface'
import OfferCard from 'components/molecules/OfferCard'
import './style.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const OfferCardList = ({ offers, isLoading }: OfferCardListProps) => {
  if (!isLoading)
    return (
      <ul className="offer-card-list">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <li className="offer-card-list__item offer-card-list__item--skeleton" key={index}>
              <div className="offer-card-list-skeleton">
                <Skeleton height={50} width={50} />
                <div className="offer-card-list-skeleton__description">
                  <Skeleton height={20} width={250} />
                  <p className="offer-card-list-skeleton__sub-description">
                    <Skeleton height={10} width={60} />
                  </p>
                </div>
              </div>
              <div className="offer-card-list-skeleton__details">
                <Skeleton height={20} width={100} />
                <div className="offer-card-list-skeleton__labels">
                  <Skeleton height={10} width={30} className="offer-card-list-skeleton__label" />
                  <Skeleton height={10} width={30} className="offer-card-list-skeleton__label" />
                  <Skeleton height={10} width={30} className="offer-card-list-skeleton__label" />
                </div>
              </div>
            </li>
          ))}
      </ul>
    )

  return (
    <OffersGridLayout>
      {offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </OffersGridLayout>
  )
}

export default OfferCardList
