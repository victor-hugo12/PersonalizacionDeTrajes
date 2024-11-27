import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'

import { calculateCoat } from './calculateCoat'

interface CoatProps {
  width?: number // Propiedad opcional para ancho
  height?: number // Propiedad opcional para altura
  length: number
  shoulder: number
  chest: number
  arm: number
  fillColor?: string // Nuevo: color de relleno dinámico
  strokeColor?: string // Nuevo: color del borde dinámico
}

const Coat: React.FC<CoatProps> = ({
  width = 400, // Valor predeterminado para el ancho
  height = 400, // Valor predeterminado para la altura
  length,
  shoulder,
  chest,
  arm,
  fillColor = 'gray', // Valor predeterminado para el color de relleno
  strokeColor = 'black', // Valor predeterminado para el color del borde
}) => {
  // Llamada a calculateCoat con las dimensiones del contenedor
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
  } = calculateCoat(
    { length, shoulder, chest, arm },
    width, // Ancho del contenedor
    height, // Altura del contenedor
  )

  return (
    <View style={[styles.imageWrapper, { width, height }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Dibujando las partes del abrigo */}
        <Path d={brazo1} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={brazo1Reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={Cuello} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={cuello1Reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={cuello1} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={bolsillo} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={bolsilloReflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {/* Dibujando los botones */}
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
