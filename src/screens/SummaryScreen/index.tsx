import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { ThemedView } from '@/components/ThemedView'
import { BLACK, WHITE } from '@/constants/colors'
import { CLOTHES } from '@/constants/selections'
import { useTheme } from '@/context/ThemeContext'
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
  const { isDarkTheme } = useTheme()

  const selectedGarment = useSelector(getSelectedGarment)
  const size = useSelector(getSelectedMeasure)
  const selectedCustom = useSelector(getCustomMeasurements)
  const measure = Object.keys(selectedCustom).length > 0 ? 'Custom' : size
  const selectedColor = useSelector(getSelectedColor)
  const selectedFabric = useSelector(getSelectedFabric)
  const selectedCustomOption = useSelector(getCustomOptions)

  const createOrder = () => {
    // dispatch order
    router.push('/(auth)/(tabs)/orders')
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={'Summary order'} />

      <View style={styles.body}>
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

        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={createOrder}>
            {i18n.t('Create order')}
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
  },
  titleSelect: {
    marginVertical: 8,
  },
})
