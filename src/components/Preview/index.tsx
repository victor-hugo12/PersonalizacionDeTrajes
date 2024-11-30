import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import { WHITE } from '@/constants/colors'
import {
  BORDER_COLORS,
  CLOTHES,
  CoatProps,
  COLOR_VALUES,
  GARMENT_MEASUREMENTS,
  PantsProps,
  VestProps,
} from '@/constants/selections'
import { getCustomMeasurements, getSelectedColor, getSelectedGarment } from '@/redux/selections/selections.selectors'
import { RootState } from '@/redux/store'

import Coat from '../Coat'
import Pants from '../Pants'
import Vest from '../Vest'

const getCompleteGarmentProps = (
  garmentType: CLOTHES,
  measurements: Record<string, number> | Record<string, string>,
) => {
  const defaultMeasurements = GARMENT_MEASUREMENTS[garmentType]?.measures.M || {}

  const completeProps = {
    ...defaultMeasurements,
    ...measurements,
    width: 300,
    height: 300,
  }

  return completeProps
}

export const getDataCoat = () => {
  console.info('getDataCoat')
}

export const getDataPants = () => {
  console.info('getDataPants')
}

export const getDataVest = () => {
  console.info('getDataVest')
}

export const Preview = () => {
  const selectedGarment = useSelector(getSelectedGarment) as CLOTHES
  const customMeasurements = useSelector((state: RootState) => getCustomMeasurements(state, selectedGarment))
  const selectedColor = useSelector(getSelectedColor)
  const fillColor = selectedColor ? COLOR_VALUES[selectedColor as keyof typeof COLOR_VALUES] : WHITE
  const strokeColor = selectedColor ? BORDER_COLORS[selectedColor as keyof typeof BORDER_COLORS] : WHITE
  const garmentProps =
    Object.keys(customMeasurements).length > 0
      ? getCompleteGarmentProps(selectedGarment, { ...customMeasurements, fillColor, strokeColor })
      : getCompleteGarmentProps(selectedGarment, { fillColor, strokeColor })

  return (
    <View style={styles.container}>
      {selectedGarment === CLOTHES.Coat && <Coat {...(garmentProps as CoatProps)} />}
      {selectedGarment === CLOTHES.Vest && <Vest {...(garmentProps as VestProps)} />}
      {selectedGarment === CLOTHES.Pants && <Pants {...(garmentProps as PantsProps)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
