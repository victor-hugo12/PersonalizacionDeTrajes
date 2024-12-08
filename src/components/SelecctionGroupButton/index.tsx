import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import i18n from '@/language'

interface Option {
  value: string
  icon?: string
  color?: string
}

interface Props {
  options: Option[]
  onSelect: (value: string) => void
  selected: string
  disabled?: boolean
  multiline?: boolean
}

export const SelectionGroupButton: React.FC<Props> = ({
  options,
  onSelect,
  selected,
  disabled = false,
  multiline = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(selected)

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    onSelect(value)
  }

  return (
    <View style={[styles.container, multiline && { flexWrap: 'wrap' }]}>
      {options.map(({ value, icon, color }) => (
        <Button
          key={value}
          dark
          theme={{ roundness: 1 }}
          mode={selectedOption === value ? 'contained' : 'outlined'}
          onPress={() => handleSelect(value)}
          style={[styles.button, multiline && { flexBasis: '49%' }]}
          icon={icon}
          contentStyle={{ flexDirection: 'row-reverse' }}
          textColor={color}
          disabled={disabled}
          compact
        >
          {i18n.t(value)}
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
