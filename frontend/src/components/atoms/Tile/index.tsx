import classNames from 'classnames'
import { TileProps } from './interface'
import './style.scss'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const Tile = ({ children, id, className, shadow, style, borderTop }: TileProps) => {
  const { themeColors } = useContext(ThemeContext)

  const borderTopStyles = {
    borderTop: `0.5em solid ${themeColors.primaryColor}`
  }

  return (
    <div
      id={id}
      className={classNames('tile', className, {
        'tile--shadow': shadow === 'normal',
        'tile--shadow-light': shadow === 'light'
      })}
      style={borderTop ? borderTopStyles : style}>
      {children}
    </div>
  )
}

export default Tile
