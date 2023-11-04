import classNames from 'classnames'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import ReactPaginate from 'react-paginate'
import { PaginationProps } from './interface'
import './style.scss'

const Pagination = ({ className, pageCount, apiRequest }: PaginationProps) => {
  const handlePageClick = (data: { selected: number }) => {
    const page = data.selected + 1

    apiRequest(page)
  }

  return (
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
  )
}

export default Pagination
