import React from 'react'
import { IOfferDetails } from 'models/offerDetails'

export interface OfferDetailsHeaderProps {
  image: string
  title: string
  company: string
  salaryMin: number
  salaryMax: number
  currency: string
  workType: string
  setOfferDetails: React.Dispatch<React.SetStateAction<IOfferDetails>>
}
