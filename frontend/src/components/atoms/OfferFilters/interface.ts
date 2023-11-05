/* eslint-disable no-unused-vars */
export interface OfferFiltersProps {
  offersCount?: number
}

export enum OfferOrder {
  NEWEST = '-created_at',
  SALARY_UP = '-salary_max',
  SALARY_DOWN = 'salary_max'
}
