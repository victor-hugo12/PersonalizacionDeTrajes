import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'
import { calculateVest } from '@/utils/calculateVest'

interface VestProps {
  width?: number
  height?: number
  length: number
  shoulder: number
  chest: number
  fillColor?: string
  strokeColor?: string
}

const Vest: React.FC<VestProps> = ({
  length,
  shoulder,
  chest,
  width = 500,
  height = 500,
  fillColor = 'gray',
  strokeColor = 'black',
}) => {
  const { original, reflected, pocket, mirroredPocket, buttons, neck } = calculateVest(
    { length, shoulder, chest },
    width,
    height,
  )

  return (
    <View style={styles.imageWrapper}>
      <Svg width={300} height={300} viewBox={`0 0 ${400} ${300}`}>
        <Path d={neck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflected} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={pocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={mirroredPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
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

export default Vest
