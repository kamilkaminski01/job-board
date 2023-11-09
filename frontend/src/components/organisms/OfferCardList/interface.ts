import { IOffer } from 'models/offer'
import { IOfferDetails } from 'models/offerDetails'
import React from 'react'

export interface OfferCardListProps {
  offers: IOffer[]
  isLoading?: boolean
  setOfferDetails: React.Dispatch<React.SetStateAction<IOfferDetails>>
}
