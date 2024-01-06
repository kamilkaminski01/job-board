import { OfferFiltersProps, OfferOrder } from './interface'
import './style.scss'
import React, { useContext, useState } from 'react'
import { OfferFiltersContext } from 'providers/offerFilters/context'
import { Range, getTrackBackground } from 'react-range'
import { ThemeContext } from 'providers/theme/context.ts'

const minRange = 0
const maxRange = 100000

const OfferFilters = ({ offersCount }: OfferFiltersProps) => {
  const { salaryRange, setSalaryRange, setSortType, sortType } = useContext(OfferFiltersContext)
  const [value, setValue] = useState(salaryRange)
  const { themeColors } = useContext(ThemeContext)

  const [startValue, endValue] = value

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value as OfferOrder)
  }

  return (
    <div className="offer-filters">
      <div className="offer-filters__item">
        <p className="offer-filters__item-title">Sort by</p>
        <select
          name="sort"
          id="sort"
          className="offer-filters__select"
          onChange={onSelectChange}
          value={sortType}>
          <option value={OfferOrder.DEFAULT}>Default</option>
          <option value={OfferOrder.NEWEST}>Newest</option>
          <option value={OfferOrder.SALARY_DOWN}>Lowest salary</option>
          <option value={OfferOrder.SALARY_UP}>Highest salary</option>
        </select>
      </div>
      <div className="offer-filters__item">
        <p className="offer-filters__item-title">Salary</p>
        <div className="offer-filters__slider">
          <span className="offer-filters__slider-values">{startValue}</span>
          <Range
            step={50}
            min={minRange}
            max={maxRange}
            values={value}
            onFinalChange={(value) => setSalaryRange(value as [number, number])}
            onChange={(value) => setValue(value as [number, number])}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="offer-filters__range-track"
                style={{
                  background: getTrackBackground({
                    values: value,
                    colors: ['#d8d8d8', themeColors.primaryColor, '#d8d8d8'],
                    min: minRange,
                    max: maxRange
                  })
                }}>
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="offer-filters__range-thumb"
                style={{
                  ...props.style,
                  backgroundColor: themeColors.primaryColor
                }}
              />
            )}
          />
          <span className="offer-filters__slider-values">{endValue}</span>
        </div>
      </div>
      <div className="offer-filters__item">
        <p className="offer-filters__item-title">Job offers</p>
        <p className="offer-filters__count">{offersCount === undefined ? '-' : offersCount}</p>
      </div>
    </div>
  )
}

export default OfferFilters
