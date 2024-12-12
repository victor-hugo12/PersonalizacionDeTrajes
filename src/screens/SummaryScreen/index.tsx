import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { ThemedView } from '@/components/ThemedView'
import { BLACK, WHITE } from '@/constants/colors'
import { CLOTHES, GARMENT_MEASUREMENTS, MEASUREMENTS } from '@/constants/selections'
import { useTheme } from '@/context/ThemeContext'
import { useAuthentication } from '@/hooks/useAuthentication'
import { OrderData, OrderStatus } from '@/models/orderData'
import { RequestStatus } from '@/models/requestStatus'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createOrder, resetCreateOrderStatus } from '@/redux/orders/orders.actions'
import { getStateOrders } from '@/redux/orders/orders.selectors'
import {
  getCustomMeasurements,
  getCustomOptions,
  getSelectedColor,
  getSelectedFabric,
  getSelectedGarment,
  getSelectedMeasure,
} from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const SummaryScreen = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAuthentication()
  const { isDarkTheme } = useTheme()
  const selectedGarment = useAppSelector(getSelectedGarment) as CLOTHES
  const size = useAppSelector(getSelectedMeasure) as MEASUREMENTS
  const selectedCustomMeasurement = useAppSelector(getCustomMeasurements)
  const measure = Object.keys(selectedCustomMeasurement).length > 0 ? 'Custom' : size
  const selectedColor = useAppSelector(getSelectedColor)
  const selectedFabric = useAppSelector(getSelectedFabric)
  const selectedCustomOption = useAppSelector(getCustomOptions)
  const { createOrderStatus, error } = useAppSelector(getStateOrders)

  const handleCreateOrder = () => {
    const date = new Date()
    const customMeasure = Object.keys(selectedCustomMeasurement).length
      ? selectedCustomMeasurement
      : GARMENT_MEASUREMENTS[selectedGarment][size]
    const order: OrderData = {
      userId: user?.id as string,
      garment: selectedGarment,
      measurument: customMeasure,
      color: selectedColor,
      fabric: selectedFabric,
      customOptions: selectedCustomOption,
      status: OrderStatus.Created,
      created: date.toISOString(),
      updated: date.toISOString(),
    }
    dispatch(createOrder(order))
  }

  useEffect(() => {
    if (createOrderStatus === RequestStatus.SUCCESS && !error) {
      router.push('/(auth)/(tabs)/orders')
      dispatch(resetCreateOrderStatus())
    }
  }, [createOrderStatus, dispatch, error, router])

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: i18n.t('Error'),
        text2: i18n.t('Error on create order'),
        type: 'error',
        visibilityTime: 5000,
      })
    }
  }, [error])

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={'Summary order'} />
      {createOrderStatus === RequestStatus.PENDING && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <ScrollView style={styles.body}>
        <Preview />
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Option list')}</Text>
        </View>
        <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
          <Text style={styles.leftText}>{i18n.t('Garment')}</Text>
          <Text style={styles.rightText}>{i18n.t(selectedGarment)}</Text>
        </View>
        <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
          <Text style={styles.leftText}>{i18n.t('Measure')}</Text>
          <Text style={styles.rightText}>{i18n.t(measure)}</Text>
        </View>
        <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
          <Text style={styles.leftText}>{i18n.t('Color')}</Text>
          <Text style={styles.rightText}>{i18n.t(selectedColor)}</Text>
        </View>
        <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
          <Text style={styles.leftText}>{i18n.t('Fabric')}</Text>
          <Text style={styles.rightText}>{i18n.t(selectedFabric)}</Text>
        </View>
        {selectedGarment === CLOTHES.Pants && (
          <View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Fold')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.fold)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Zipper')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.zipper)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Front pocket')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.frontPocket)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Back pocket')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.backPocket)}</Text>
            </View>
          </View>
        )}
        {selectedGarment === CLOTHES.Vest && (
          <View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Buttons')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.buttons)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Pocket count')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.pocketCount)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Pocket type')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.pocketType)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Lapel')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.lapel)}</Text>
            </View>
          </View>
        )}

        {selectedGarment === CLOTHES.Coat && (
          <View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Buttons')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.buttons)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Pocket count')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.pocketCount)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Pocket type')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.pocketType)}</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: isDarkTheme ? WHITE : BLACK }]}>
              <Text style={styles.leftText}>{i18n.t('Lapel')}</Text>
              <Text style={styles.rightText}>{i18n.t(selectedCustomOption.lapel)}</Text>
            </View>
          </View>
        )}

        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={handleCreateOrder}>
            {i18n.t('Create order')}
          </PaperButton>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 25,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationButton: {
    marginTop: 20,
    marginBottom: 60,
  },
  titleSelect: {
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  },
})
