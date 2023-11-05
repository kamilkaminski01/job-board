import './style.scss'
import HeaderIcon1 from 'assets/icons/offers-header-icon-1.png'
import HeaderIcon2 from 'assets/icons/offers-header-icon-2.png'
import HeaderIcon3 from 'assets/icons/offers-header-icon-3.png'
import HeaderIcon4 from 'assets/icons/offers-header-icon-4.png'

const OffersBanner = () => (
  <div className="offers-banner">
    <header className="offers-banner__header">
      <h1 className="offers-banner__title">Job Board for the tech industry in Europe</h1>
    </header>
    <div className="offers-banner__content">
      <ul className="offers-banner__list">
        <li className="offers-banner__list-item">
          <img src={HeaderIcon1} alt="header icon" />
        </li>
        <li className="offers-banner__list-item">
          <img src={HeaderIcon2} alt="header icon" />
        </li>
        <li className="offers-banner__list-item">
          <img src={HeaderIcon3} alt="header icon" />
        </li>
        <li className="offers-banner__list-item">
          <img src={HeaderIcon4} alt="header icon" />
        </li>
      </ul>
    </div>
  </div>
)

export default OffersBanner
