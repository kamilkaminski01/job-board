import './style.scss'
import { HomePageHeaderProps } from './interface'
import OffersBanner from 'components/atoms/OffersBanner'

const HomePageHeader = ({ offerCount }: HomePageHeaderProps) => {
  return (
    <div className="home-page-header">
      <OffersBanner />
      <span>offer count: {offerCount}</span>
    </div>
  )
}

export default HomePageHeader
