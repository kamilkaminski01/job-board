import { OffersGridLayoutProps } from './interface'
import './style.scss'

const OffersGridLayout = ({ children }: OffersGridLayoutProps) => {
  return <div className="offers-grid">{children}</div>
}

export default OffersGridLayout
