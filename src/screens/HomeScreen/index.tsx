import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { ThemedView } from '@/components/ThemedView'

export const HomeScreen = () => {
  const router = useRouter()
  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title="Home" icon="home" backAction={false} />
      <View style={styles.body}>
        <Text>Home Screen</Text>
        <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/measurement')}>
          Go to escoger prenda
        </PaperButton>
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
})
