import { OfferOrder } from 'components/atoms/OfferFilters/interface'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import { OfferFiltersContext } from './context'

export const OfferFiltersContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000])
  const [sortType, setSortType] = useState(OfferOrder.DEFAULT)

  const params = useMemo(
    () =>
      new URLSearchParams({
        ordering: [OfferOrder.IS_PROMOTED, sortType].join(','),
        min: salaryRange[0].toString(),
        max: salaryRange[1].toString()
      }).toString(),
    [salaryRange, sortType]
  )

  const contextProps = useMemo(
    () => ({
      salaryRange,
      setSalaryRange,
      sortType,
      setSortType,
      params
    }),
    [salaryRange, sortType, params]
  )

  return (
    <OfferFiltersContext.Provider value={contextProps}>{children}</OfferFiltersContext.Provider>
  )
}
