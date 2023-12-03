import Pagination from 'components/atoms/Pagination'
import { OffersAppliedListProps } from './interface.ts'
import OffersGridLayout from 'components/atoms/OffersGridLayout'
import OfferAppliedCard from 'components/molecules/OfferAppliedCard'
import './style.scss'

const OffersAppliedList = ({
  offersAppliedList,
  pageCount,
  getOffersApplied
}: OffersAppliedListProps) => {
  return (
    <>
      {offersAppliedList.length ? (
        <OffersGridLayout>
          {offersAppliedList.map((offerApplied) => (
            <OfferAppliedCard key={offerApplied.id} offerApplied={offerApplied} />
          ))}
        </OffersGridLayout>
      ) : (
        <div className="offers-applied-list--no-data">
          <h3>Offers applied</h3>
          <p className="offers-applied__subtitle">You haven&apos;t applied to any offers</p>
        </div>
      )}
      {pageCount > 1 && <Pagination pageCount={pageCount} apiRequest={getOffersApplied} />}
    </>
  )
}

export default OffersAppliedList
