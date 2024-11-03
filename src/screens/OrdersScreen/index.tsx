import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { CustomAppBar } from '@/components/CustomAppBar'
import { ThemedView } from '@/components/ThemedView'

export const OrdersScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title="Orders" icon="clipboard-list" />
      <View style={styles.body}>
        <Text>Orders Screen</Text>
      </View>
    </ThemedView>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 25,
    flex: 1,
  },
})
