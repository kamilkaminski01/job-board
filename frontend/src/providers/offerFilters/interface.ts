import { OfferOrder } from 'components/atoms/OfferFilters/interface'
import React from 'react'

export interface OfferFiltersContextProps {
  salaryRange: [number, number]
  setSalaryRange: React.Dispatch<React.SetStateAction<[number, number]>>
  sortType: OfferOrder
  setSortType: React.Dispatch<React.SetStateAction<OfferOrder>>
  params: string
}
