import './style.scss'
import OffersHeader from 'components/molecules/OffersHeader'
import useOffers from 'hooks/useOffers'
import Pagination from 'components/atoms/Pagination'
import OfferCardList from 'components/organisms/OfferCardList'
import OfferDetails from 'components/organisms/OfferDetails'
import { useEffect, useState } from 'react'
import { IOfferDetails } from 'models/offerDetails'
import useOfferDetails from 'hooks/useOfferDetails.ts'

const OffersContent = () => {
  const { offersList, offersCount, pageCount, isLoading, getOffers } = useOffers()
  const [offerDetails, setOfferDetails] = useState<IOfferDetails>({} as IOfferDetails)
  const [offerId, setOfferId] = useState<number>(0)
  const { getData } = useOfferDetails(offerId, { dontFetchOnMount: true })

  useEffect(() => {
    offersList.length > 0 && setOfferId(offersList[0].id)
  }, [isLoading])

  useEffect(() => {
    const getOffer = async () => {
      const response = await getData()

      if (response.succeed && response.data) {
        setOfferDetails(response.data)
      }
    }

    if (offerId && offerDetails.id === undefined) getOffer()
  }, [offerId])

  return (
    <div className="offers-layout">
      <OffersHeader offersCount={offersCount} />
      <div className="offers-content">
        <OfferCardList offers={offersList} {...{ isLoading }} setOfferDetails={setOfferDetails} />
        <OfferDetails offer={offerDetails} {...{ isLoading }} />
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
