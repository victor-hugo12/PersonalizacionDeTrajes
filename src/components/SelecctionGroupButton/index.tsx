import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import i18n from '@/language'

type Props = {
  options: string[]
  onSelect: (value: string) => void
  selected: string
  icons?: { [key: string]: string }
  colors?: { [key: string]: string }
}

export const SelectionGroupButton: React.FC<Props> = ({ options, onSelect, selected, icons, colors }) => {
  const [selectedOption, setSelectedOption] = useState<string>(selected)

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    onSelect(value)
  }

  return (
    <View style={styles.container}>
      {options.map(option => (
        <Button
          key={option}
          dark
          theme={{ roundness: 1 }}
          mode={selectedOption === option ? 'contained' : 'outlined'}
          onPress={() => handleSelect(option)}
          style={styles.button}
          icon={icons && icons[option] ? icons[option] : undefined}
          contentStyle={{ flexDirection: 'row-reverse' }}
          textColor={colors && colors[option]}
        >
          {i18n.t(option)}
        </Button>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    flex: 1,
  },
})
