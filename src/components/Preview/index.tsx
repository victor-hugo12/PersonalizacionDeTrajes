import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import { WHITE } from '@/constants/colors'
import { BORDER_COLORS, CLOTHES, COLOR_VALUES } from '@/constants/selections'
import { getCustomMeasurements, getSelectedColor, getSelectedGarment } from '@/redux/selections/selections.selectors'
import { RootState } from '@/redux/store'
import { calculateCoat } from '@/utils/calculateCoat'
import { calculatePants } from '@/utils/calculatePants'
import { calculateVest } from '@/utils/calculateVest'

import { Coat } from '../Coat'
import { Pants } from '../Pants'
import { Vest } from '../Vest'

interface Button {
  cx: number
  cy: number
  r: number
}

export interface CoatProps {
  rightCoatPath: string
  leftCoatPath: string
  rightPocket: string
  leftPocket: string
  buttons: Button[]
  neck: string
  rightRoundNeck: string
  leftRoundNeck: string
  rightArm: string
  leftArmMirrored: string
  fillColor: string
  strokeColor: string
}

export interface PantsProps {
  fillColor?: string
  strokeColor?: string
  rigthPantsPath: string
  leftPantsPath: string
}

export interface VestProps {
  fillColor?: string
  strokeColor?: string
  rightVestPath: string
  leftVestPath: string
  rightVestPocket: string
  leftVestPocket: string
  buttons: Button[]
  neck: string
}

const getColors = (selectedColor: string) => ({
  fillColor: selectedColor ? COLOR_VALUES[selectedColor as keyof typeof COLOR_VALUES] : WHITE,
  strokeColor: selectedColor ? BORDER_COLORS[selectedColor as keyof typeof BORDER_COLORS] : WHITE,
})

const getDataCoat = (
  measurements: { length: number; shoulder: number; chest: number; arm: number },
  selectedColor: string,
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

const getDataPants = (
  measurements: { hem: number; knee: number; thigh: number; waist: number; length: number; inseam: number },
  selectedColor: string,
): PantsProps => {
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

export const Preview = () => {
  const selectedGarment = useSelector(getSelectedGarment) as CLOTHES
  const measurements = useSelector((state: RootState) => getCustomMeasurements(state, selectedGarment))
  const selectedColor = useSelector(getSelectedColor)
  let component: JSX.Element | null = null

  switch (selectedGarment) {
    case CLOTHES.Coat: {
      const measurementsCoat = {
        length: measurements['length'],
        shoulder: measurements['shoulder'],
        chest: measurements['chest'],
        arm: measurements['arm'],
      }
      const componentProps = getDataCoat(measurementsCoat, selectedColor)
      component = <Coat {...componentProps} />
      break
    }
    case CLOTHES.Pants: {
      const measurementsPants = {
        hem: measurements['hem'],
        knee: measurements['knee'],
        thigh: measurements['thigh'],
        waist: measurements['waist'],
        length: measurements['length'],
        inseam: measurements['inseam'],
      }
      const componentProps = getDataPants(measurementsPants, selectedColor)
      component = <Pants {...componentProps} />
      break
    }
    case CLOTHES.Vest: {
      const measurementsVest = {
        length: measurements['length'],
        shoulder: measurements['shoulder'],
        chest: measurements['chest'],
      }
      const componentProps = getDataVest(measurementsVest, selectedColor)
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
