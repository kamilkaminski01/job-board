import './style.scss'
import Tile from 'components/atoms/Tile'
import { OfferDetailsTechStackProps } from './interface'
import classNames from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const OfferDetailsTechStack = ({ techStacks }: OfferDetailsTechStackProps) => {
  const { themeColors } = useContext(ThemeContext)

  const getAdvancement = (advancement: string) => {
    const advancementLevel = (advancement: string): number => {
      switch (advancement) {
        case 'Nice to have':
          return 1
        case 'Junior':
          return 2
        case 'Regular':
          return 3
        case 'Advanced':
          return 4
        case 'Master':
          return 5
        default:
          return 0
      }
    }

    return Array.from({ length: 5 }, (_, index) => (
      <li
        key={index}
        className={classNames('tech-stack__level-dot')}
        style={{
          backgroundColor: index < advancementLevel(advancement) ? themeColors.primaryColor : ''
        }}></li>
    ))
  }

  return (
    <Tile shadow="light">
      <h2 className="offer-details__tech-stack-title">Tech stack</h2>
      <div className="offer-details__tech-stack">
        {techStacks.map((techStack) => (
          <div key={techStack.id} className="tech-stack__details">
            <h4 className="tech-stack__title">{techStack.title}</h4>
            <ul className="tech-stack__list">{getAdvancement(techStack.advancement)}</ul>
            <span className="tech-stack__advancement">{techStack.advancement}</span>
          </div>
        ))}
      </div>
    </Tile>
  )
}

export default OfferDetailsTechStack
