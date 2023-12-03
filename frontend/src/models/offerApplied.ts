import { IOffer } from 'models/offer.ts'

export interface IOfferApplied {
  id: number
  applicationDate: string
  offer: IOffer
}
