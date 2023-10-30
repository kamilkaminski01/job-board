import classNames from 'classnames'
import { SettingsTileRecordProps } from './interface'
import './style.scss'

const SettingsTileRecord = ({
  label,
  value,
  valueType,
  secondValue,
  button,
  className
}: SettingsTileRecordProps) => {
  const renderValue = () => {
    if (!value) {
      return <span>-</span>
    } else if (value && valueType === 'image') {
      return <img src={value} />
    } else {
      return <span>{value}</span>
    }
  }

  return (
    <div className={classNames('settings-tile-record', className)}>
      <label className="settings-tile-record__label">{label}</label>
      <div
        className={classNames('settings-tile-record__value', {
          'settings-tile-record__value--bold': secondValue,
          'settings-tile-record__value--password': valueType === 'password',
          'settings-tile-record__value--image': valueType === 'image'
        })}>
        {renderValue()}
      </div>

      {secondValue && (
        <span className="settings-tile-record__value settings-tile-record__value--second">
          {secondValue}
        </span>
      )}

      {button && (
        <span className="settings-tile-record__btn" onClick={button.onClick}>
          {button.text}
        </span>
      )}
    </div>
  )
}

export default SettingsTileRecord
