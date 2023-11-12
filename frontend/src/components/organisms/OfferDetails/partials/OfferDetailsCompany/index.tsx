import './style.scss'
import Tile from 'components/atoms/Tile'
import { OfferDetailsCompanyProps } from './interface'

const OfferDetailsCompany = ({ company, companyDescription }: OfferDetailsCompanyProps) => {
  return (
    <Tile shadow="light">
      <div className="offer-details__company">
        <h2 className="offer-details__company-name">{company}</h2>
        <p className="offer-details__company-description">{companyDescription}</p>
      </div>
    </Tile>
  )
}

export default OfferDetailsCompany
