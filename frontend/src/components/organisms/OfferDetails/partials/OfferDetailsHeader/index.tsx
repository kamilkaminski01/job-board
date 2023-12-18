import './style.scss'
import Tile from 'components/atoms/Tile'
import { OfferDetailsHeaderProps } from './interface'
import BuildingIconWhite from 'assets/icons/building-white.png'
import { BiWallet } from 'react-icons/bi'
import { formatNumber } from 'utils/formatNumber'
import CloseIcon from 'assets/icons/close-icon.svg'
import { IOfferDetails } from 'models/offerDetails'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const OfferDetailsHeader = ({
  image,
  title,
  company,
  salaryMin,
  salaryMax,
  currency,
  workType,
  setOfferDetails
}: OfferDetailsHeaderProps) => {
  const { themeColors } = useContext(ThemeContext)

  const closeOfferDetails = () => {
    setOfferDetails({} as IOfferDetails)
  }

  return (
    <Tile
      shadow="light"
      className="offer-details__header"
      style={{ backgroundColor: themeColors.primaryColor }}>
      {image ? (
        <img src={image} className="header__image" />
      ) : (
        <div className="header__image"></div>
      )}
      <div className="header__details">
        <h1 className="header__title">{title}</h1>
        <div className="header__company">
          <img src={BuildingIconWhite} />
          <span className="header__company-name">{company}</span>
        </div>
        <div className="header__salary">
          <BiWallet className="header__salary-icon" />
          <div>
            {formatNumber(salaryMin)} - {formatNumber(salaryMax)} {currency}
            <p className="header__salary-work-type">{workType}</p>
          </div>
        </div>
      </div>
      <button className="header__close-button" onClick={closeOfferDetails}>
        <img src={CloseIcon} alt="Close icon" />
      </button>
    </Tile>
  )
}

export default OfferDetailsHeader
