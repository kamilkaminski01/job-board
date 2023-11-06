import { ITechStack } from 'models/techStack'

export interface OfferCardProps {
  company: string
  image: string
  title: string
  salaryMin: number
  salaryMax: number
  currency: string
  techStacks: [ITechStack]
}
