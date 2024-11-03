import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { CustomAppBar } from '@/components/CustomAppBar'
import { ThemedView } from '@/components/ThemedView'

export const SettingsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title="Settings" icon="cogs" />
      <View style={styles.body}>
        <Text>Settings Screen</Text>
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
