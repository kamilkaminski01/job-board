import { SettingsTileSubtitleProps } from './interface'
import './style.scss'

const SettingsTileSubtitle = ({ children }: SettingsTileSubtitleProps) => {
  return <p className="settings-tile-subtitle">{children}</p>
}

export default SettingsTileSubtitle
