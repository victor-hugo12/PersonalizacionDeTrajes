import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { BLACK, WHITE } from '@/constants/colors'
import { CLOTHES, COLORS_OPTIONS, GARMENT_MEASUREMENTS, MEASUREMENTS } from '@/constants/selections'
import { useAppDispatch } from '@/redux/hooks'
import { updateCustomOptions } from '@/redux/selections/selections.actions'
import {
  getCustomMeasurements,
  getCustomOptions,
  getSelectedColor,
  getSelectedGarment,
  getSelectedMeasure,
} from '@/redux/selections/selections.selectors'
import { calculateCoat } from '@/utils/calculateCoat'
import { calculatePants } from '@/utils/calculatePants'
import { calculateVest } from '@/utils/calculateVest'

import { Coat, CoatProps } from '../Coat'
import { CoatMeasurementValues } from '../CoatMeausurement'
import { Pants, PantsProps } from '../Pants'
import { PantsMeasurementValues } from '../PantsMeausurement'
import { Vest, VestProps } from '../Vest'
import { VestMeasurementValues } from '../VestMeausurement'

const getColors = (selectedColor: string) => {
  const selectedOption = COLORS_OPTIONS.find(option => option.value === selectedColor)
  return {
    fillColor: selectedOption?.color || WHITE,
    strokeColor: selectedOption?.borderColor || BLACK,
  }
}

const getDataCoat = (
  measurements: CoatMeasurementValues,
  selectedColor: string,
  customOptions: Record<string, string>,
): CoatProps => {
  const { fillColor, strokeColor } = getColors(selectedColor)
  const {
    rightCoatPath,
    leftCoatPath,
    rightPocket,
    leftPocket,
    buttons,
    neck,
    rightRoundNeck,
    leftRoundNeck,
    rightArm,
    leftArm,
    rightTopPocket,
  } = calculateCoat(measurements, 300, 300, customOptions)

  return {
    fillColor,
    strokeColor,
    rightCoatPath,
    leftCoatPath,
    rightPocket,
    leftPocket,
    buttons,
    neck,
    rightRoundNeck,
    leftRoundNeck,
    rightArm,
    leftArm,
    rightTopPocket,
  }
}
const getDataPants = (
  measurements: PantsMeasurementValues,
  selectedColor: string,
  customOptions: Record<string, string>,
): PantsProps => {
  const { fillColor, strokeColor } = getColors(selectedColor)
  const {
    rightPantsPath,
    leftPantsPath,
    rightPocketPath,
    leftPocketPath,
    closure,
    rightWaist,
    leftWaist,
    rightCrease,
    leftCrease,
  } = calculatePants(measurements, 300, 300, customOptions)
  return {
    fillColor,
    strokeColor,
    rightPantsPath,
    leftPantsPath,
    rightPocketPath,
    leftPocketPath,
    closure,
    rightWaist,
    leftWaist,
    rightCrease,
    leftCrease,
  }
}

const getDataVest = (
  measurements: { length: number; shoulder: number; chest: number },
  selectedColor: string,
  customOptions: Record<string, string>,
): VestProps => {
  const { fillColor, strokeColor } = getColors(selectedColor)
  const {
    rightVestPath,
    leftVestPath,
    rightVestPocket,
    leftVestPocket,
    buttons,
    neck,
    rightTopPocket,
    rightRoundNeck,
    leftRoundNeck,
  } = calculateVest(measurements, 300, 300, customOptions)
  return {
    fillColor,
    strokeColor,
    rightVestPath,
    leftVestPath,
    rightVestPocket,
    leftVestPocket,
    buttons,
    neck,
    rightTopPocket,
    rightRoundNeck,
    leftRoundNeck,
  }
}
const getMeasurements = (garmentType: CLOTHES, size: MEASUREMENTS, measurements: Record<string, number>) => {
  if (Object.keys(measurements).length) {
    return measurements
  }
  return GARMENT_MEASUREMENTS[garmentType][size]
}

export const Preview = () => {
  const dispatch = useAppDispatch()
  const selectedGarment = useSelector(getSelectedGarment) as CLOTHES
  const size = useSelector(getSelectedMeasure) as MEASUREMENTS
  const customMeasurements = useSelector(getCustomMeasurements)
  const selectedColor = useSelector(getSelectedColor)
  const customOptions = useSelector(getCustomOptions)
  let component: JSX.Element | null = null
  const toggleBackPocketEnable = () => {
    const newValue = customOptions.backPocketEnable === 'on' ? 'off' : 'on'
    dispatch(updateCustomOptions({ key: 'backPocketEnable', value: newValue }))
  }

  switch (selectedGarment) {
    case CLOTHES.Coat: {
      const measurementsCoat = getMeasurements(selectedGarment, size, customMeasurements)
      const componentProps = getDataCoat(measurementsCoat as CoatMeasurementValues, selectedColor, customOptions)
      component = <Coat {...componentProps} />
      break
    }
    case CLOTHES.Pants: {
      const measurementsPants = getMeasurements(selectedGarment, size, customMeasurements)
      const componentProps = getDataPants(measurementsPants as PantsMeasurementValues, selectedColor, customOptions)
      component = <Pants {...componentProps} />
      break
    }

    case CLOTHES.Vest: {
      const measurementsVest = getMeasurements(selectedGarment, size, customMeasurements)
      const componentProps = getDataVest(measurementsVest as VestMeasurementValues, selectedColor, customOptions)
      component = <Vest {...componentProps} />
      break
    }
  }
  return (
    <View style={styles.container}>
      {selectedGarment === CLOTHES.Pants && (
        <IconButton
          icon="rotate-3d-variant"
          size={24}
          onPress={toggleBackPocketEnable}
          style={styles.iconButton}
          iconColor="black"
        />
      )}
      {component}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    bottom: 2,
    right: 20,
    zIndex: 10,
  },
})
