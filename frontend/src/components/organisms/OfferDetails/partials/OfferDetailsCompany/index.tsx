import './style.scss'
import Tile from 'components/atoms/Tile'
import { OfferDetailsCompanyProps } from './interface'

const OfferDetailsCompany = ({ company, companyDescription }: OfferDetailsCompanyProps) => {
  return (
    <Tile shadow="light">
      {company}
      <div>{companyDescription}</div>
    </Tile>
  )
}

export default OfferDetailsCompany
