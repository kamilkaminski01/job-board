import classNames from 'classnames'
import { LineSeparatorProps } from './interface'
import './style.scss'

const LineSeparator = ({ color }: LineSeparatorProps) => {
  return (
    <div
      className={classNames('line-separator', {
        'line-separator--white': color === 'white',
        'line-separator--primary-color': color === 'primary'
      })}
    />
  )
}

export default LineSeparator
