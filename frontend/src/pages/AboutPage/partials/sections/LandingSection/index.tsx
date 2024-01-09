import './style.scss'
import LandingImage from 'assets/images/landing-image.png'
import LandingCard from 'pages/AboutPage/partials/components/LandingCard'

const LandingSection = () => {
  return (
    <section className="landing-section">
      <img className="landing-section__bg-image" src={LandingImage} />
      <LandingCard />
    </section>
  )
}

export default LandingSection
