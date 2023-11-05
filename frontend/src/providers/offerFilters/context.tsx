import { createContext, useContext } from 'react'
import { OfferFiltersContextProps } from './interface'

export const OfferFiltersContext = createContext({} as OfferFiltersContextProps)

export const useOfferFiltersContext = () => useContext(OfferFiltersContext)
