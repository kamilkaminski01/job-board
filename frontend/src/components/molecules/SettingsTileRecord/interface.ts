export interface SettingsTileRecordProps {
  label: string
  value: string
  valueType?: 'password'
  secondValue?: string
  className?: string
  button?: {
    text: string
    onClick: () => void
  }
}
