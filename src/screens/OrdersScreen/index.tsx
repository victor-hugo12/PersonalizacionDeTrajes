import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Card, IconButton, Menu, Paragraph, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import { CustomAppBar } from '@/components/CustomAppBar'
import { ThemedView } from '@/components/ThemedView'
import { useAuthentication } from '@/hooks/useAuthentication'
import i18n from '@/language'
import { Order, OrderStatus } from '@/models/orderData'
import { RequestStatus } from '@/models/requestStatus'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { cancelOrder, deleteOrder, getOrders, reactivateOrder } from '@/redux/orders/orders.actions'
import { getStateOrders } from '@/redux/orders/orders.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const OrdersScreen = () => {
  const [initialLoad, setInitialLoad] = useState(true)
  const { user } = useAuthentication()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { orders, getOrdersStatus, error } = useAppSelector(getStateOrders)
  const isLoading = initialLoad || getOrdersStatus === RequestStatus.PENDING

  const handleCancelOrder = useCallback(
    (orderId: string) => {
      dispatch(cancelOrder(orderId))
      setSelectedOrderId(null)
    },
    [dispatch],
  )

  const handleReactivateOrder = useCallback(
    (orderId: string) => {
      dispatch(reactivateOrder(orderId))
      setSelectedOrderId(null)
    },
    [dispatch],
  )

  const handleDeleteOrder = useCallback(
    (orderId: string) => {
      dispatch(deleteOrder(orderId))
      setSelectedOrderId(null)
    },
    [dispatch],
  )

  const renderOrderItem = useCallback(
    ({ item }: { item: Order }) => (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.titleSection}>
            <Text variant="titleLarge">{item.garment}</Text>
            <Menu
              visible={selectedOrderId === item.id}
              onDismiss={() => setSelectedOrderId(null)}
              anchor={<IconButton icon="dots-vertical" onPress={() => setSelectedOrderId(item.id)} />}
            >
              {item.status !== OrderStatus.Canceled && item.status !== OrderStatus.Completed && (
                <Menu.Item onPress={() => handleCancelOrder(item.id)} title={i18n.t('Cancel Order')} />
              )}
              {item.status === OrderStatus.Canceled && (
                <Menu.Item onPress={() => handleReactivateOrder(item.id)} title={i18n.t('Reactivate Order')} />
              )}
              {item.status !== OrderStatus.Canceled && item.status !== OrderStatus.Completed && (
                <Menu.Item onPress={() => handleDeleteOrder(item.id)} title={i18n.t('Delete Order')} />
              )}
            </Menu>
          </View>
          <Paragraph>
            {i18n.t('Status')}: {i18n.t(item.status)}
          </Paragraph>
          <Paragraph>
            {i18n.t('Color')}: {i18n.t(item.color)}
          </Paragraph>
          <Paragraph>
            {i18n.t('Fabric')}: {i18n.t(item.fabric)}
          </Paragraph>
          <Paragraph>
            {i18n.t('Updated')}: {moment(item.updated).format('hh:mm:ss D/M/yy')}
          </Paragraph>
        </Card.Content>
      </Card>
    ),
    [selectedOrderId, handleCancelOrder, handleReactivateOrder, handleDeleteOrder],
  )

  useEffect(() => {
    if (user?.id) {
      dispatch(getOrders(user?.id as string))
      setInitialLoad(false)
    }
  }, [dispatch, user?.id])

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: i18n.t('Error'),
        text2: i18n.t('Error on retrieve orders'),
        type: 'error',
        visibilityTime: 5000,
      })
    }
  }, [error])

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title="Orders" icon="clipboard-list" />
      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : orders.length === 0 ? (
          <Text variant="displayLarge" style={{ textAlign: 'center' }}>
            {i18n.t('No orders found')}
          </Text>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={item => item.id}
            extraData={selectedOrderId}
          />
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
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
