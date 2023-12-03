import { OfferAppliedCardProps } from './interface.ts'
import OfferCardTile from 'components/atoms/OfferCardTile'
import BuildingIcon from 'assets/icons/building.png'
import { formatNumber } from 'utils/formatNumber.ts'
import OfferTechStackLabels from 'components/atoms/OfferTechStackLabels'

const OfferAppliedCard = ({ offerApplied }: OfferAppliedCardProps) => {
  const { offer } = offerApplied
  const { image, title, company, salaryMin, salaryMax, currency, experience, techStacks } = offer

  return (
    <>
      <OfferCardTile className="offer-applied-card">
        {offer ? (
          <img src={image} className="offer-card-tile__image" />
        ) : (
          <div className="offer-card-tile__image"></div>
        )}
        <div className="offer-card-tile__details">
          <h3 className="offer-card-tile__title">{title}</h3>
          <div className="offer-card-tile__company-items">
            <img src={BuildingIcon} />
            <span className="offer-card-tile__company">{company}</span>
          </div>
        </div>
        <div className="offer-card-tile__extra-details">
          <div className="offer-card-tile__salary">
            {formatNumber(salaryMin)} - {formatNumber(salaryMax)} {currency}
            <p className="offer-card-tile__experience">{experience}</p>
          </div>
          <OfferTechStackLabels techStacks={techStacks} />
        </div>
      </OfferCardTile>
    </>
  )
}

export default OfferAppliedCard
