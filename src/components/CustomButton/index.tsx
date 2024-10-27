import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Surface, Text } from 'react-native-paper'

import { useTheme } from '@/context/ThemeContext'

interface Props {
  label: string
  icon?: string
  onPress: () => void
}

export const CustomButton: React.FC<Props> = ({ label, icon, onPress }) => {
  const { theme } = useTheme()

  return (
    <Surface style={{ backgroundColor: theme.colors.surface, ...styles.container }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {icon && <FontAwesome5 name={icon} size={20} color={theme.colors.primary} />}
        <Text variant="titleMedium">{label}</Text>
      </TouchableOpacity>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
