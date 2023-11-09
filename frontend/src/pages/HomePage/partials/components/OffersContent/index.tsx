import './style.scss'
import OffersHeader from 'components/molecules/OffersHeader'
import useOffers from 'hooks/useOffers'
import Pagination from 'components/atoms/Pagination'
import OfferCardList from 'components/organisms/OfferCardList'
import OfferDetails from 'components/organisms/OfferDetails/OfferDetails'
import { useState } from 'react'
import { IOfferDetails } from 'models/offerDetails'

const OffersContent = () => {
  const { offersList, offersCount, pageCount, isLoading, getOffers } = useOffers()
  const [offerDetails, setOfferDetails] = useState<IOfferDetails>({} as IOfferDetails)

  return (
    <div className="offers-layout">
      <OffersHeader offersCount={offersCount} />
      <div className="offers-content">
        <OfferCardList offers={offersList} {...{ isLoading }} setOfferDetails={setOfferDetails} />
        <OfferDetails offer={offerDetails} />
      </div>
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
