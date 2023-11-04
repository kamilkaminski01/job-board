import { ITechStack } from './techStack'

export interface IOffer {
  company: string
  image: string
  title: string
  salaryMin: number
  salaryMax: number
  description: string
  experience: string
  employmentType: string
  workType: string
  techStacks: [ITechStack]
}
