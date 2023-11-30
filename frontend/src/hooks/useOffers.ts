import { IApiPaginatedListResponse } from 'models/responses/apiPaginatedListResponse'
import { IOffer } from 'models/offer'
import useData from './useData'
import { ENDPOINTS, RECORDS_PER_PAGE } from 'utils/consts'
import { OfferFiltersContext } from 'providers/offerFilters/context'
import { useContext } from 'react'

const useOffers = () => {
  const { params } = useContext(OfferFiltersContext)

  const {
    data,
    getData: getOffers,
    ...rest
  } = useData<IApiPaginatedListResponse<IOffer>>(`${ENDPOINTS.offers}?${params}`, {
    recordsPerPage: RECORDS_PER_PAGE.offers,
    delayResponse: 500
  })

  const { count: offersCount, results: offersList = [] } = data || {}

  return { offersList, offersCount, getOffers, ...rest }
}

export default useOffers
