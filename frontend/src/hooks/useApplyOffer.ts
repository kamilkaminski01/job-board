import { IApplyOffer } from 'models/IApplyOffer'
import { ENDPOINTS } from 'utils/consts'
import useData from 'hooks/useData'

const useApplyOffer = () => {
  const { createData: applyOffer } = useData<IApplyOffer>(ENDPOINTS.applyOffer, {
    dontFetchOnMount: true
  })

  return { applyOffer }
}

export default useApplyOffer
