import './style.scss'
import { OfferCardTileProps } from './interface'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const OfferCardTile = ({ className, children, onCardClick }: OfferCardTileProps) => {
  const { themeColors } = useContext(ThemeContext)
  const [hover, setHover] = useState(false)

  return (
    <button
      className={classNames('offer-card-tile', className)}
      onClick={onCardClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ boxShadow: hover ? `0 0 0.3em 0.3em ${themeColors.hoverColor}` : '' }}>
      {children}
    </button>
  )
}

export default OfferCardTile
