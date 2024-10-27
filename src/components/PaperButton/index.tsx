import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { Button } from 'react-native-paper'

type Props = React.ComponentProps<typeof Button>

export const PaperButton: React.FC<Props> = ({ icon, ...props }) => {
  let customIcon = icon
  if (typeof customIcon === 'string') {
    customIcon = ({ color }) => <FontAwesome5 name={icon} size={20} color={color} />
  }
  return <Button icon={customIcon} theme={{ roundness: 1 }} {...props} labelStyle={{ fontSize: 16 }} />
}
