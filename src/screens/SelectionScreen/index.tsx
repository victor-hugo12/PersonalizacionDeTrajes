import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { WHITE } from '@/constants/colors'
import { BORDER_COLORS, COLOR_VALUES } from '@/constants/selections'
import {
  CLOTHES,
  CoatProps,
  GARMENT_MEASUREMENTS,
  GarmentType,
  getGarmentComponent,
  PantsProps,
  VestProps,
} from '@/constants/selections'
import { setSelectedGarment } from '@/redux/selections/selections.actions'
import { getCustomMeasurements, getSelectedColor, getSelectedGarment } from '@/redux/selections/selections.selectors'
import { RootState } from '@/redux/store'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)
const getCompleteGarmentProps = (
  garmentType: GarmentType,
  measurements: Record<string, number> | Record<string, string>,
): PantsProps | VestProps | CoatProps => {
  const defaultMeasurements = GARMENT_MEASUREMENTS[garmentType]?.measures.M || {}

  const completeProps = {
    ...defaultMeasurements,
    ...measurements,
    width: 400,
    height: 400,
  }

  return completeProps as PantsProps | VestProps | CoatProps
}

export const SelectionScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const selectedGarment = useSelector(getSelectedGarment) as GarmentType
  const customMeasurements = useSelector((state: RootState) => getCustomMeasurements(state, selectedGarment))
  const selectedColor = useSelector(getSelectedColor)

  const fillColor = selectedColor ? COLOR_VALUES[selectedColor as keyof typeof COLOR_VALUES] : WHITE
  const strokeColor = selectedColor ? BORDER_COLORS[selectedColor as keyof typeof BORDER_COLORS] : WHITE
  const garmentProps =
    Object.keys(customMeasurements).length > 0
      ? getCompleteGarmentProps(selectedGarment, { ...customMeasurements, fillColor, strokeColor })
      : getCompleteGarmentProps(selectedGarment, { fillColor, strokeColor })

  const handleSelection = (option: string) => {
    const garmentType = option as GarmentType
    dispatch(setSelectedGarment(garmentType))
  }

  const SelectedGarmentComponent = getGarmentComponent(selectedGarment)

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={i18n.t('Choice of garment')} backAction={false} />

      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: WHITE }]}>
            {SelectedGarmentComponent ? <SelectedGarmentComponent {...garmentProps} /> : null}
          </View>
        </View>

        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your garment')}</Text>
        </View>

        <View style={styles.selectionContainer}>
          <SelectionGroupButton
            options={CLOTHES.map(garment => ({
              value: garment,
            }))}
            onSelect={handleSelection}
            selected={selectedGarment}
          />
        </View>

        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/measurement')}>
            {i18n.t('Next')}
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
  selectionContainer: {
    marginVertical: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imageWrapper: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
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
