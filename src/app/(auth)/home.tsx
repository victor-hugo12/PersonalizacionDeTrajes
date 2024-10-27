import { StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { ThemedView } from '@/components/ThemedView'
import { signOutUser } from '@/services/firebaseAuth'

const HomeScreen = () => {
  const logout = async () => {
    await signOutUser()
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button mode="contained" dark onPress={logout} style={styles.button}>
        logout
      </Button>
    </ThemedView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
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
