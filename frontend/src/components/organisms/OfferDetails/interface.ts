import { IOfferDetails } from 'models/offerDetails'
import React from 'react'

export interface OfferDetailsProps {
  offer: IOfferDetails
  setOfferDetails: React.Dispatch<React.SetStateAction<IOfferDetails>>
}
