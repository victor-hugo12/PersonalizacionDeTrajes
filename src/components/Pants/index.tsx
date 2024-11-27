// src/components/Trapecio/index.tsx
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { WHITE } from '@/constants/colors'

import { calculatePants } from './calculatePants'

interface PantsProps {
  width?: number // Propiedad opcional para ancho
  height?: number // Propiedad opcional para altura
  hem: number
  knee: number
  thigh: number
  waist: number
  length: number
  inseam: number
  fillColor?: string // Nuevo: color de relleno dinámico
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
  fillColor = 'gray', // Valor predeterminado para el color de relleno
  strokeColor = 'black', // Valor predeterminado para el color del borde
}) => {
  // Calcular rutas para el pantalón usando las medidas
  const { original, reflejado } = calculatePants(
    { hem, knee, thigh, waist, length, inseam },
    width, // Ancho del contenedor
    height, // Altura del contenedor
  )

  return (
    <View style={[styles.imageWrapper, { width, height }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Dibujar las piezas del pantalón */}
        <Path d={original} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={reflejado} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
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
