import useOfferApplicationHistory from 'hooks/useOfferApplicationHistory.ts'
import OffersAppliedList from 'components/molecules/OffersAppliedList'

const OfferApplicationHistory = () => {
  const { offersAppliedList, pageCount, getOffersApplied } = useOfferApplicationHistory()

  return (
    <div className="offer-application-history">
      <OffersAppliedList
        offersAppliedList={offersAppliedList || []}
        pageCount={pageCount}
        getOffersApplied={getOffersApplied}
      />
    </div>
  )
}

export default OfferApplicationHistory
