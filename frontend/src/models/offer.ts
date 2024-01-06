import { ITechStack } from './techStack'

export interface IOffer {
  id: number
  isPromoted: boolean
  company: string
  image: string
  title: string
  salaryMin: number
  salaryMax: number
  currency: string
  description: string
  experience: string
  techStacks: [ITechStack]
}
