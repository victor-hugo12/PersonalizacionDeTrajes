import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Button, TextInput, Card, Title, Paragraph } from 'react-native-paper'
import { useThemeColor } from '@/hooks/useThemeColor'

const ExampleScreen = () => {
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const buttonColor = useThemeColor({}, 'tint')
  const inputColor = useThemeColor({}, 'background') // Color del fondo de los inputs

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Appbar.Header>
        <Appbar.Content title="Example Screen" />
      </Appbar.Header>

      <View style={styles.content}>
        <TextInput
          label="Email"
          mode="outlined"
          style={[styles.input, { backgroundColor: inputColor }]}
          selectionColor={buttonColor}
          textColor={textColor} // Color del texto del input
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          style={[styles.input, { backgroundColor: inputColor }]}
          selectionColor={buttonColor}
          textColor={textColor} // Color del texto del input
        />

        <Button
          mode="contained"
          onPress={() => console.log('Button pressed')}
          color={buttonColor} // Color del botón
        >
          Submit
        </Button>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ color: textColor }}>Card Title</Title>
            <Paragraph style={{ color: textColor }}>This is a simple card.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log('Card button pressed')} color={buttonColor}>
              OK
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  card: {
    marginTop: 16,
  },
})

export default ExampleScreen
