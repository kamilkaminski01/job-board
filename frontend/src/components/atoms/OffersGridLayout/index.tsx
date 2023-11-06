import { OffersGridLayoutProps } from './interface'
import './style.scss'

const OffersGridLayout = ({ children }: OffersGridLayoutProps) => {
  return (
    <div className="offers-layout">
      <div className="offers-grid">{children}</div>
    </div>
  )
}

export default OffersGridLayout
