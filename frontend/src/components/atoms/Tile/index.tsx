import classNames from 'classnames'
import { TileProps } from './interface'
import './style.scss'

const Tile = ({ children, id, className, shadow, style }: TileProps) => {
  return (
    <div
      id={id}
      className={classNames('tile', className, {
        'tile--shadow': shadow === 'normal',
        'tile--shadow-light': shadow === 'light'
      })}
      style={style}>
      {children}
    </div>
  )
}

export default Tile
