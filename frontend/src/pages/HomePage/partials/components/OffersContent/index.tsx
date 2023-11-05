import './style.scss'
import OffersHeader from 'components/molecules/OffersHeader'
import useOffers from 'hooks/useOffers'
import Pagination from 'components/atoms/Pagination'

const OffersContent = () => {
  // eslint-disable-next-line
  const { offersList, offersCount, pageCount, isLoading, getOffers } = useOffers()

  return (
    <div className="offers-content">
      <OffersHeader offersCount={offersCount} />
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
