import { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Card, Paragraph, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import { CustomAppBar } from '@/components/CustomAppBar'
import { ThemedView } from '@/components/ThemedView'
import i18n from '@/language'
import { Order } from '@/models/orderData'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getOrders } from '@/redux/orders/orders.actions'
import { getStateOrders } from '@/redux/orders/orders.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const OrdersScreen = () => {
  const dispatch = useAppDispatch()
  const { orders, loading, error = 'something' } = useAppSelector(getStateOrders)

  const renderOrderItem = ({ item }: { item: Order }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{item.garment}</Text>
        <Paragraph>
          {i18n.t('Status')}: {i18n.t(item.status)}
        </Paragraph>
        <Paragraph>
          {i18n.t('Color')}: {i18n.t(item.color)}
        </Paragraph>
        <Paragraph>
          {i18n.t('Fabric')}: {i18n.t(item.fabric)}
        </Paragraph>
      </Card.Content>
    </Card>
  )
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  if (error) {
    Toast.show({
      text1: i18n.t('Error'),
      text2: i18n.t('Error on retrieve orders'),
      type: 'error',
      visibilityTime: 5000,
    })
  }
  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title="Orders" icon="clipboard-list" />
      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : orders.length === 0 ? (
          <Text variant="displayLarge" style={{ textAlign: 'center' }}>
            {i18n.t('No orders found')}
          </Text>
        ) : (
          <FlatList data={orders} renderItem={renderOrderItem} keyExtractor={item => item.id} />
        )}
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
    justifyContent: 'center',
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
  },
})
