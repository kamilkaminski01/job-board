import './style.scss'
import Tile from 'components/atoms/Tile'
import TimerIcon from 'assets/icons/timer.png'
import StarIcon from 'assets/icons/star.png'
import DocumentIcon from 'assets/icons/document.png'
import { OfferDetailsIconsProps } from './interface'

const OfferDetailsIcons = ({ workType, experience, employmentType }: OfferDetailsIconsProps) => {
  return (
    <Tile shadow="light">
      <div className="offer-details__icons">
        <div className="icons__details">
          <div className="icons__icon" style={{ backgroundColor: '#FFFAF0' }}>
            <img src={TimerIcon} />
          </div>
          <div className="icon__info">
            <label>Type of work</label>
            {workType}
          </div>
        </div>
        <div className="icons__details">
          <div className="icons__icon" style={{ backgroundColor: '#F5E9F6' }}>
            <img src={StarIcon} />
          </div>
          <div className="icon__info">
            <label>Experience</label>
            {experience}
          </div>
        </div>
        <div className="icons__details">
          <div className="icons__icon" style={{ backgroundColor: '#F0FFF4' }}>
            <img src={DocumentIcon} />
          </div>
          <div className="icon__info">
            <label>Employment type</label>
            {employmentType}
          </div>
        </div>
      </div>
    </Tile>
  )
}

export default OfferDetailsIcons
