import { IServerResponse } from 'models/serverResponse'
import { IOfferApplied } from 'models/offerApplied.ts'

export interface OffersAppliedListProps {
  offersAppliedList: IOfferApplied[]
  pageCount: number
  getOffersApplied: (page?: number) => Promise<IServerResponse<unknown>>
}
