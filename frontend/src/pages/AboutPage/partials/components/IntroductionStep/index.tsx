import './style.scss'
import { IntroductionStepProps } from './interface.ts'
import Tile from 'components/atoms/Tile'
import { useNavigate } from 'react-router-dom'
import Button from 'components/atoms/Button'

const IntroductionStep = ({ step, title, content, button }: IntroductionStepProps) => {
  const navigate = useNavigate()

  return (
    <Tile className="introduction-step" shadow="normal" borderTop>
      <span className="introduction-step__bg-index">{step}</span>
      <h1 className="introduction-step__title">{title}</h1>
      <p className="introduction-step__content">{content}</p>
      <Button className="introduction-step__btn" onClick={() => navigate(button.link)}>
        {button.text}
      </Button>
    </Tile>
  )
}

export default IntroductionStep
