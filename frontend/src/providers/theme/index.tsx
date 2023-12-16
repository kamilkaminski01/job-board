import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ThemeContext } from './context.ts'
import useCustomizationColors from 'hooks/useCustomizationColors.ts'
import { ICustomizationColors } from 'models/customizationColors.ts'

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [themeColors, setThemeColors] = useState({} as ICustomizationColors)
  const { customizationColors } = useCustomizationColors()

  useEffect(() => {
    if (customizationColors) {
      setThemeColors(customizationColors)
    }
  }, [customizationColors])

  return (
    <ThemeContext.Provider value={{ themeColors, setThemeColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
