import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'
import { calculateCoat } from '@/utils/calculateCoat'

interface CoatProps {
  width?: number
  height?: number
  length: number
  shoulder: number
  chest: number
  arm: number
  fillColor?: string
  strokeColor?: string
}

const Coat: React.FC<CoatProps> = ({
  width = 400,
  height = 400,
  length,
  shoulder,
  chest,
  arm,
  fillColor = 'gray',
  strokeColor = 'black',
}) => {
  const { original, reflected, pocket, mirroredPocket, buttons, neck, neck1, neck1Mirrored, arm1, arm1Mirrored } =
    calculateCoat({ length, shoulder, chest, arm }, width, height)

  return (
    <View style={[styles.imageWrapper, { width, height }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Path d={arm1} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={arm1Mirrored} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={neck} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflected} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={neck1Mirrored} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={neck1} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={pocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={mirroredPocket} fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {buttons.map((button, index) => (
          <Circle key={index} cx={button.cx} cy={button.cy} r={button.r} fill={strokeColor} />
        ))}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
})

export default Coat
