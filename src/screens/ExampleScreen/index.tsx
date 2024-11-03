import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import { CustomAppBar } from '@/components/CustomAppBar'
import { CustomButton } from '@/components/CustomButton'
import { CustomSearch } from '@/components/CustomSearch'
import { PaperButton } from '@/components/PaperButton'
import { ThemedView } from '@/components/ThemedView'
import { useTheme } from '@/context/ThemeContext'

export const ExampleScreen = () => {
  useTheme()

  const test = () => {
    Toast.show({
      type: 'info',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 5000,
    })
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title="Example Screen" icon="home" />
      <View style={styles.body}>
        <Text style={styles.text}>ExampleScreen</Text>
        <View style={{ height: 60, padding: 10 }}>
          <CustomButton label="test" onPress={test} />
        </View>
        <View style={{ height: 60 }}>
          <CustomSearch placeholder="search" onChange={() => console.info('onChange')} />
        </View>
        <View style={{ height: 60, flex: 1, display: 'flex' }}>
          <PaperButton
            mode="contained"
            dark
            onPress={() => console.info('onPress')}
            icon={({ size }) => (
              <Image source={require('@/assets/images/google.png')} style={{ width: size, height: size }} />
            )}
          >
            PaperButton
          </PaperButton>
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 25,
    flex: 1,
  },
  button: {
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
  },
})
