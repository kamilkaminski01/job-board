import './style.scss'
import Tile from 'components/atoms/Tile'
import { OfferDetailsTechStackProps } from './interface'

const OfferDetailsTechStack = ({ techStacks }: OfferDetailsTechStackProps) => {
  return (
    <Tile shadow="light">
      <div className="offer-details__tech-stack">
        Tech stack
        {techStacks.map((techStack) => (
          <div key={techStack.id}>
            {techStack.title}
            <p>{techStack.advancement}</p>
          </div>
        ))}
      </div>
    </Tile>
  )
}

export default OfferDetailsTechStack
