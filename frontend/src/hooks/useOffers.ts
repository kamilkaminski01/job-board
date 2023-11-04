import { IApiPaginatedListResponse } from 'models/responses/apiPaginatedListResponse'
import { IOffer } from 'models/offer'
import useData from './useData'
import { ENDPOINTS, RECORDS_PER_PAGE } from 'utils/consts'

const useOffers = () => {
  const {
    data,
    getData: getOffers,
    ...rest
  } = useData<IApiPaginatedListResponse<IOffer>>(ENDPOINTS.offers, {
    recordsPerPage: RECORDS_PER_PAGE.offers
  })

  const { count: offersCount, results: offersList = [] } = data || {}

  return { offersList, offersCount, getOffers, ...rest }
}

export default useOffers
