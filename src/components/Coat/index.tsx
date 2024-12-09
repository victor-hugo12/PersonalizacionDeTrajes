import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'

interface ButtonProp {
  cx: number
  cy: number
  r: number
}

export interface CoatProps {
  rightCoatPath: string
  leftCoatPath: string
  rightPocket: string
  leftPocket: string
  buttons: ButtonProp[]
  neck: string
  rightRoundNeck?: string
  leftRoundNeck?: string
  rightArm: string
  leftArm: string
  rightTopPocket?: string
  fillColor: string
  strokeColor: string
}

export const Coat: React.FC<CoatProps> = ({
  fillColor = 'gray',
  strokeColor = 'black',
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
}) => {
  return (
    <View style={styles.imageWrapper}>
      <Svg width={300} height={300} viewBox="0 0 350 350">
        <Path d={rightArm} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftArm} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={neck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftCoatPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        {leftRoundNeck && <Path d={leftRoundNeck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />}
        <Path d={rightCoatPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        {rightTopPocket && <Path d={rightTopPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />}
        {rightRoundNeck && <Path d={rightRoundNeck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />}
        <Path d={rightPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {buttons.map((button, index) => (
          <Circle key={index} cx={button.cx} cy={button.cy} r={button.r} fill={strokeColor} />
        ))}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
})
