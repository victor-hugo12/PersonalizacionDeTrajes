import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { PantsProps } from '@/components/Preview'
import { WHITE } from '@/constants/colors'

export const Pants: React.FC<PantsProps> = ({
  fillColor = 'gray',
  strokeColor = 'black',
  rigthPantsPath,
  leftPantsPath,
}) => {
  return (
    <View style={styles.imageWrapper}>
      <Svg width={300} height={300} viewBox={`0 0 ${350} ${350}`}>
        <Path d={rigthPantsPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <Path d={leftPantsPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
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
