import { IOffer } from 'models/offer'

export interface IOfferDetails extends IOffer {
  companyDescription?: string
  employmentType: string
  workType: string
}
