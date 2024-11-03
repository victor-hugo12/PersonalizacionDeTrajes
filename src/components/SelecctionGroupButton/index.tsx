import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

type Props = {
  options: string[]
  onSelect: (value: string) => void
  selected: string
}

export const SelectionGroupButton: React.FC<Props> = ({ options, onSelect, selected }) => {
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
          labelStyle={styles.label}
        >
          {option}
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
  label: {
    color: 'white',
  },
})
