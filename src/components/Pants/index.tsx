import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'
import { calculatePants } from '@/utils/calculatePants'

interface PantsProps {
  width?: number
  height?: number
  hem: number
  knee: number
  thigh: number
  waist: number
  length: number
  inseam: number
  fillColor?: string
  strokeColor?: string
}

const Pants: React.FC<PantsProps> = ({
  width = 400,
  height = 400,
  hem,
  knee,
  thigh,
  waist,
  length,
  inseam,
  fillColor = 'gray',
  strokeColor = 'black',
}) => {
  const { original, reflected } = calculatePants({ hem, knee, thigh, waist, length, inseam }, width, height)

  return (
    <View style={[styles.imageWrapper, { width, height }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflected} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
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

export default Pants
