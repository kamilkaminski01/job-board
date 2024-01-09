import './style.scss'
import LandingSection from './partials/sections/LandingSection'
import IntroductionSection from './partials/sections/IntroductionSection'

const AboutPage = () => {
  return (
    <div className="about-page">
      <LandingSection />
      <IntroductionSection />
    </div>
  )
}

export default AboutPage
