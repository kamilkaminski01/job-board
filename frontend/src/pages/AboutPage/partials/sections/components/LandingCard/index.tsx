import './style.scss'
import Tile from 'components/atoms/Tile'
import LineSeparator from 'components/atoms/LineSeparator'
import Button from 'components/atoms/Button'
import { useNavigate } from 'react-router-dom'
import { PATHS } from 'utils/consts.ts'

const LandingCard = () => {
  const navigate = useNavigate()

  return (
    <Tile className="landing-card" shadow="normal">
      <h3 className="landing-card__title">
        Welcome to the go-to platform for IT professionals seeking opportunities in Europe
      </h3>
      <LineSeparator />
      <p className="landing-card__content">
        Explore exciting career prospects in the dynamic field of Information Technology with our
        specialized job board. We connect talented IT specialists with top employers across Europe,
        offering a comprehensive platform for finding your ideal job. Our job board provides a
        curated selection of opportunities to match your skills and aspirations
      </p>
      <Button className="landing-card__btn" onClick={() => navigate(PATHS.home)}>
        Find a job!
      </Button>
    </Tile>
  )
}

export default LandingCard
