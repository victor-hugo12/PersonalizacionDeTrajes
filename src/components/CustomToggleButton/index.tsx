import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MD3Theme } from 'react-native-paper'

interface CustomToggleButtonProps {
  label: string
  value: string
  onPress: () => void
  isSelected: boolean
  theme: MD3Theme
}

const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({ label, onPress, isSelected, theme }) => {
  return (
    <TouchableOpacity
      style={[
        styles.toggleButton,
        isSelected ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.surface },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: isSelected ? 'white' : theme.colors.onSurface }}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CustomToggleButton
