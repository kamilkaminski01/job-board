import { ContentSwitcherButtonProps } from './interface'
import './style.scss'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const ContentSwitcherButton = ({ children, isActive, onClick }: ContentSwitcherButtonProps) => {
  const { themeColors } = useContext(ThemeContext)

  return (
    <div className="content-switcher-wrapper">
      <button
        style={{ color: isActive ? themeColors.primaryColor : '' }}
        className="content-switcher__button"
        onClick={onClick}>
        {children}
      </button>
      {isActive && (
        <div
          style={{ backgroundColor: themeColors.primaryColor }}
          className="content-switcher__line"
        />
      )}
    </div>
  )
}

export default ContentSwitcherButton
