import useData from 'hooks/useData.ts'
import { IApiPaginatedListResponse } from 'models/responses/apiPaginatedListResponse.ts'
import { ENDPOINTS, RECORDS_PER_PAGE } from 'utils/consts.ts'
import { IOfferApplied } from 'models/offerApplied.ts'

const useOfferApplicationHistory = () => {
  const {
    data,
    pageCount,
    getData: getOffersApplied
  } = useData<IApiPaginatedListResponse<IOfferApplied>>(ENDPOINTS.offerApplicationHistory, {
    recordsPerPage: RECORDS_PER_PAGE.offersApplied
  })

  const { results: offersAppliedList } = data || {}

  return { offersAppliedList, pageCount, getOffersApplied }
}

export default useOfferApplicationHistory
