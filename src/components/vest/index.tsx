import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'

import { calculateVest } from './calculateVest'

// Interfaz de las propiedades del chaleco
interface VestProps {
  width?: number // Ancho del contenedor opcional
  height?: number // Altura del contenedor opcional
  length: number
  shoulder: number
  chest: number
  fillColor?: string
  strokeColor?: string
}

// Componente funcional de Chaleco
const Vest: React.FC<VestProps> = ({
  length,
  shoulder,
  chest,
  width = 500, // Valor predeterminado para el ancho
  height = 500,
  fillColor = 'gray', // Valor predeterminado para el color de relleno
  strokeColor = 'black', // Valor predeterminado para el color del borde// Valor predeterminado para la altura
}) => {
  // Llamar a la función de cálculo para obtener las dimensiones y rutas del chaleco
  const { original, reflejado, bolsillo, bolsilloReflejado, botones, Cuello } = calculateVest(
    { length, shoulder, chest }, // Parámetros de las medidas del chaleco
    width, // Ancho del contenedor
    height, // Altura del contenedor
  )

  return (
    <View style={[styles.imageWrapper, { width, height }]}>
      {/* Contenedor SVG para el chaleco */}
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Dibujando las partes del chaleco */}
        <Path d={Cuello} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={bolsillo} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={bolsilloReflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {/* Dibujando los botones */}
        {botones.map((boton, index) => (
          <Circle key={index} cx={boton.cx} cy={boton.cy} r={boton.r} fill="black" />
        ))}
      </Svg>
    </View>
  )
}

// Estilo del contenedor SVG
const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
})

export default Vest
