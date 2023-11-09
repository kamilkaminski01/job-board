import useData from 'hooks/useData'
import { IOfferDetails } from 'models/offerDetails'
import { generatePath } from 'react-router-dom'
import { ENDPOINTS } from 'utils/consts'

const useOfferDetails = (id: number, options?: { dontFetchOnMount: true }) => {
  const { data, getData, isLoading } = useData<IOfferDetails>(
    generatePath(ENDPOINTS.offerDetails, { id: `${id}` }),
    { dontFetchOnMount: options?.dontFetchOnMount }
  )

  return { data, getData, isLoading }
}

export default useOfferDetails
