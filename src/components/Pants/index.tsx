import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

import { WHITE } from '@/constants/colors'

export interface PantsProps {
  fillColor?: string
  strokeColor?: string
  rightPantsPath: string
  rightPocketPath: string
  leftPantsPath: string
  leftPocketPath: string
  closure: string
  rightWaist: string
  leftWaist: string
  rightCrease: string
  leftCrease: string
}

export const Pants: React.FC<PantsProps> = ({
  fillColor = 'gray',
  strokeColor = 'black',
  rightPantsPath,
  leftPantsPath,
  rightPocketPath,
  leftPocketPath,
  closure,
  rightWaist,
  leftWaist,
  rightCrease,
  leftCrease,
}) => {
  return (
    <View style={styles.imageWrapper}>
      <Svg width={300} height={300} viewBox="0 0 350 350">
        <Defs>
          <LinearGradient id="creaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={strokeColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={fillColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Path d={leftPantsPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={rightPantsPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={rightPocketPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftPocketPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={rightWaist} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftWaist} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={closure} fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        <Path d={rightCrease} fill="none" stroke="url(#creaseGradient)" strokeWidth="2" />
        <Path d={leftCrease} fill="none" stroke="url(#creaseGradient)" strokeWidth="2" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
})
