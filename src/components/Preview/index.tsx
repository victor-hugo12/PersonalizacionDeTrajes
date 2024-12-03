import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import { BLACK, WHITE } from '@/constants/colors'
import { CLOTHES, GARMENT_MEASUREMENTS, MEASUREMENTS } from '@/constants/selections'
import { COLORS_OPTIONS } from '@/constants/selections'
import {
  getCustomMeasurements,
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

const getDataCoat = (measurements: CoatMeasurementValues, selectedColor: string): CoatProps => {
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
    leftArmMirrored,
  } = calculateCoat(measurements, 300, 300)

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
    leftArmMirrored,
  }
}

const getDataPants = (measurements: PantsMeasurementValues, selectedColor: string): PantsProps => {
  const { fillColor, strokeColor } = getColors(selectedColor)
  const { rigthPantsPath, leftPantsPath } = calculatePants(measurements, 300, 300)
  return { fillColor, strokeColor, rigthPantsPath, leftPantsPath }
}

const getDataVest = (
  measurements: { length: number; shoulder: number; chest: number },
  selectedColor: string,
): VestProps => {
  const { fillColor, strokeColor } = getColors(selectedColor)
  const { rightVestPath, leftVestPath, rightVestPocket, leftVestPocket, buttons, neck } = calculateVest(
    measurements,
    300,
    300,
  )
  return { fillColor, strokeColor, rightVestPath, leftVestPath, rightVestPocket, leftVestPocket, buttons, neck }
}

const getMeasurements = (garmentType: CLOTHES, size: MEASUREMENTS, measurements: Record<string, number> | null) => {
  if (measurements && Object.keys(measurements).length) {
    return measurements
  }
  return GARMENT_MEASUREMENTS[garmentType][size]
}

export const Preview = () => {
  const selectedGarment = useSelector(getSelectedGarment) as CLOTHES
  const size = useSelector(getSelectedMeasure) as MEASUREMENTS
  const customMeasurements = useSelector(getCustomMeasurements)
  const selectedColor = useSelector(getSelectedColor)
  let component: JSX.Element | null = null

  switch (selectedGarment) {
    case CLOTHES.Coat: {
      const measurementsCoat = getMeasurements(selectedGarment, size, customMeasurements)
      const componentProps = getDataCoat(measurementsCoat as CoatMeasurementValues, selectedColor)
      component = <Coat {...componentProps} />
      break
    }
    case CLOTHES.Pants: {
      const measurementsPants = getMeasurements(selectedGarment, size, customMeasurements)
      const componentProps = getDataPants(measurementsPants as PantsMeasurementValues, selectedColor)
      component = <Pants {...componentProps} />
      break
    }
    case CLOTHES.Vest: {
      const measurementsVest = getMeasurements(selectedGarment, size, customMeasurements)
      const componentProps = getDataVest(measurementsVest as VestMeasurementValues, selectedColor)
      component = <Vest {...componentProps} />
      break
    }
  }
  return <View style={styles.container}>{component}</View>
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
