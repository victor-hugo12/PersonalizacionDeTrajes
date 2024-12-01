import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { VestProps } from '@/components/Preview'
import { WHITE } from '@/constants/colors'

export const Vest: React.FC<VestProps> = ({
  fillColor = 'gray',
  strokeColor = 'black',
  leftVestPath,
  rightVestPath,
  rightVestPocket,
  leftVestPocket,
  buttons,
  neck,
}) => {
  return (
    <View style={styles.imageWrapper}>
      <Svg width={300} height={300} viewBox={`0 0 ${350} ${350}`}>
        <Path d={neck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftVestPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={rightVestPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={rightVestPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftVestPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        {buttons.map((button, index) => (
          <Circle key={index} cx={button.cx} cy={button.cy} r={button.r} fill="black" />
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
