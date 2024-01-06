import { ITechStack } from 'models/techStack'
import React from 'react'
import { IOfferDetails } from 'models/offerDetails'

export interface OfferCardProps {
  id: number
  isPromoted: boolean
  company: string
  image: string
  title: string
  salaryMin: number
  salaryMax: number
  currency: string
  experience: string
  techStacks: [ITechStack]
  setOfferDetails: React.Dispatch<React.SetStateAction<IOfferDetails>>
}
