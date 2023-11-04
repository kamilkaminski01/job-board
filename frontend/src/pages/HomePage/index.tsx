import './style.scss'
import HomePageHeader from 'components/molecules/HomePageHeader'
import useOffers from 'hooks/useOffers'
import Pagination from 'components/atoms/Pagination'

const HomePage = () => {
  // eslint-disable-next-line
  const { offersList, offersCount, pageCount, isLoading, getOffers } = useOffers()

  return (
    <div className="home-page">
      <HomePageHeader offerCount={offersCount} />
      {pageCount > 1 && (
        <Pagination
          className="home-page__pagination"
          pageCount={pageCount}
          apiRequest={getOffers}
        />
      )}
    </div>
  )
}

export default HomePage
