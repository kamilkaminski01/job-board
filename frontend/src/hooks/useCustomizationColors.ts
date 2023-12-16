import useData from './useData.ts'
import { ICustomizationColors } from 'models/customizationColors.ts'
import { ENDPOINTS } from 'utils/consts.ts'

const useCustomizationColors = () => {
  const { data: customizationColors } = useData<ICustomizationColors>(ENDPOINTS.customizationColors)

  return { customizationColors }
}

export default useCustomizationColors
