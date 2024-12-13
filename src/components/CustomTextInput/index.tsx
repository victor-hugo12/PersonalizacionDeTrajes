import React from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'

interface CustomTextInputProps extends TextInputProps {
  editable: boolean
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ editable, ...props }) => {
  return <TextInput {...props} outlineStyle={editable ? undefined : { borderColor: '#8A8A8A' }} />
}

export default CustomTextInput
