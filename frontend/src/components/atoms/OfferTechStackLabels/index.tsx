import './style.scss'
import { OfferTechStackLabelsProps } from './interface'

const OfferTechStackLabels = ({ techStacks }: OfferTechStackLabelsProps) => {
  return (
    <div className="offer-card-tile__tech-stacks">
      {techStacks.slice(0, 3).map((techStack) => (
        <p key={techStack.id} className="offer-card-tile__tech-stack">
          {techStack.title}
        </p>
      ))}
    </div>
  )
}

export default OfferTechStackLabels
