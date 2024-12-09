import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'

interface ButtonProp {
  cx: number
  cy: number
  r: number
}

export interface VestProps {
  fillColor?: string
  strokeColor?: string
  rightVestPath: string
  leftVestPath: string
  rightVestPocket: string
  leftVestPocket: string
  buttons: ButtonProp[]
  neck: string
  rightTopPocket?: string
  rightRoundNeck?: string
  leftRoundNeck?: string
}

export const Vest: React.FC<VestProps> = ({
  fillColor = 'gray',
  strokeColor = 'black',
  leftVestPath,
  rightVestPath,
  rightVestPocket,
  leftVestPocket,
  buttons,
  neck,
  rightTopPocket,
  rightRoundNeck,
  leftRoundNeck,
}) => {
  return (
    <View style={styles.imageWrapper}>
      <Svg width={300} height={300} viewBox={`0 0 ${350} ${350}`}>
        <Path d={neck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftVestPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        {leftRoundNeck && <Path d={leftRoundNeck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />}
        <Path d={rightVestPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={rightVestPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftVestPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        {rightTopPocket && <Path d={rightTopPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />}
        {buttons.map((button, index) => (
          <Circle key={index} cx={button.cx} cy={button.cy} r={button.r} fill={strokeColor} />
        ))}
        {rightRoundNeck && <Path d={rightRoundNeck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />}
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
