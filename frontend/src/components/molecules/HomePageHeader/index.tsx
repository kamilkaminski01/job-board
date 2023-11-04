import './style.scss'
import { HomePageHeaderProps } from './interface'

const HomePageHeader = ({ offerCount }: HomePageHeaderProps) => {
  return (
    <div className="home-page-header">
      <span>offer count: {offerCount}</span>
    </div>
  )
}

export default HomePageHeader
