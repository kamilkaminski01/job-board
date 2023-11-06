import './style.scss'
import OffersHeader from 'components/molecules/OffersHeader'
import useOffers from 'hooks/useOffers'
import Pagination from 'components/atoms/Pagination'
import OfferCardList from 'components/organisms/OfferCardList'

const OffersContent = () => {
  const { offersList, offersCount, pageCount, isLoading, getOffers } = useOffers()

  return (
    <div className="offers-content">
      <OffersHeader offersCount={offersCount} />
      <OfferCardList offers={offersList} {...{ isLoading }} />
      {pageCount > 1 && (
        <Pagination
          className="offers-content__pagination"
          pageCount={pageCount}
          apiRequest={getOffers}
        />
      )}
    </div>
  )
}

export default OffersContent
