import { OfferCardProps } from './interface'
import OfferCardTile from 'components/atoms/OfferCardTile'
import OfferTechStackLabels from 'components/atoms/OfferTechStackLabels'
import useOfferDetails from 'hooks/useOfferDetails'
import BuildingIcon from 'assets/icons/building.png'
import { formatNumber } from 'utils/formatNumber'

const OfferCard = ({
  id,
  company,
  image,
  title,
  salaryMin,
  salaryMax,
  currency,
  experience,
  techStacks,
  setOfferDetails
}: OfferCardProps) => {
  const { getData } = useOfferDetails(id, { dontFetchOnMount: true })

  const openOfferDetails = async () => {
    const response = await getData()

    if (response.succeed && response.data) {
      setOfferDetails(response.data)
    }
  }

  return (
    <OfferCardTile onCardClick={openOfferDetails}>
      <img src={image} className="offer-card-tile__image" alt="company image" />
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
  )
}

export default OfferCard
