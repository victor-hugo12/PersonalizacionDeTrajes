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
  const {
    original,
    reflejado,
    bolsillo,
    bolsilloReflejado,
    botones,
    Cuello,
    cuello1,
    cuello1Reflejado,
    brazo1,
    brazo1Reflejado,
  } = calculateCoat({ length, shoulder, chest, arm }, width, height)

  return (
    <View style={[styles.imageWrapper, { width, height }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Path d={brazo1} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={brazo1Reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={Cuello} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={cuello1Reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={cuello1} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={bolsillo} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={bolsilloReflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {botones.map((boton, index) => (
          <Circle key={index} cx={boton.cx} cy={boton.cy} r={boton.r} fill={strokeColor} />
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
