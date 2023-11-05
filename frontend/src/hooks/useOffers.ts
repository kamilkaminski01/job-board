import { IApiPaginatedListResponse } from 'models/responses/apiPaginatedListResponse'
import { IOffer } from 'models/offer'
import useData from './useData'
import { ENDPOINTS, RECORDS_PER_PAGE } from 'utils/consts'
import { useOfferFiltersContext } from 'providers/offerFilters/context'

const useOffers = () => {
  const { params } = useOfferFiltersContext()

  const {
    data,
    getData: getOffers,
    ...rest
  } = useData<IApiPaginatedListResponse<IOffer>>(`${ENDPOINTS.offers}?${params}`, {
    recordsPerPage: RECORDS_PER_PAGE.offers
  })

  const { count: offersCount, results: offersList = [] } = data || {}

  return { offersList, offersCount, getOffers, ...rest }
}

export default useOffers
