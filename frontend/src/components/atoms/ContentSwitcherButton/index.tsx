import classNames from 'classnames'
import { ContentSwitcherButtonProps } from './interface'
import './style.scss'

const ContentSwitcherButton = ({
  children,
  className,
  isActive,
  onClick
}: ContentSwitcherButtonProps) => {
  return (
    <button
      className={classNames('content-switcher-button', className, {
        'content-switcher-button--active': isActive
      })}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default ContentSwitcherButton
