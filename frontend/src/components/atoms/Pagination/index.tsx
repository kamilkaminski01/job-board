import classNames from 'classnames'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import ReactPaginate from 'react-paginate'
import { PaginationProps } from './interface'
import './style.scss'
import { useContext } from 'react'
import { OfferFiltersContext } from 'providers/offerFilters/context.ts'

const Pagination = ({ className, pageCount, apiRequest }: PaginationProps) => {
  const { remountPagination } = useContext(OfferFiltersContext)

  const handlePageClick = (data: { selected: number }) => {
    const page = data.selected + 1

    apiRequest(page)
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    // https://github.com/AdeleD/react-paginate/issues/198#issuecomment-1260271456
    // hack required to reset pagination to page 1 after changing sorting
    <div key={remountPagination}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FiChevronRight />}
        previousLabel={<FiChevronLeft />}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        className={classNames('pagination', className)}
        pageClassName="pagination__page-item"
        activeClassName="pagination__page-item--active"
        previousClassName="pagination__label"
        nextClassName="pagination__label"
        disabledClassName="pagination__label--disabled"
      />
    </div>
  )
}

export default Pagination
