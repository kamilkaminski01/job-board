import { OfferCardProps } from './interface'
import OfferCardTile from 'components/atoms/OfferCardTile'
import OfferTechStackLabels from 'components/atoms/OfferTechStackLabels'

const OfferCard = ({
  company,
  image,
  title,
  salaryMin,
  salaryMax,
  currency,
  techStacks
}: OfferCardProps) => {
  const openOfferDetails = async () => {
    console.log('opened details')
  }

  const formatSalary = (salary: number) => {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <OfferCardTile onCardClick={openOfferDetails}>
      <img src={image} className="offer-card-tile__image" alt="company image" />
      <div className="offer-card-tile__details">
        <h3 className="offer-card-tile__title">{title}</h3>
        <div className="offer-card-tile__company-items">
          <img width="16" height="16" src="https://img.icons8.com/small/16/737373/company.png" />
          <span className="offer-card-tile__company">{company}</span>
        </div>
      </div>
      <div className="offer-card-tile__extra-details">
        <div className="offer-card-tile__salary">
          {formatSalary(salaryMin)} - {formatSalary(salaryMax)} {currency}
        </div>
        <OfferTechStackLabels techStacks={techStacks} />
      </div>
    </OfferCardTile>
  )
}

export default OfferCard
