import { ICustomizationColors } from 'models/customizationColors.ts'

export interface ThemeContextProps {
  themeColors: ICustomizationColors
  setThemeColors: (colors: ICustomizationColors) => void
}
