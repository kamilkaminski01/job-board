import OffersContent from './partials/components/OffersContent'
import { OfferFiltersContextProvider } from 'providers/offerFilters'

const HomePage = () => {
  return (
    <OfferFiltersContextProvider>
      <OffersContent />
    </OfferFiltersContextProvider>
  )
}

export default HomePage
