import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Switch, Text } from 'react-native-paper'
import i18n from 'src/language'

import { CoatMeasurementValues, CoatMeausurement } from '@/components/CoatMeausurement'
import { CustomAppBar } from '@/components/CustomAppBar'
import { PantsMeasurementValues, PantsMeausurement } from '@/components/PantsMeausurement'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { VestMeasurementValues, VestMeausurement } from '@/components/VestMeausurement'
import { CLOTHES, GARMENT_MEASUREMENTS, MEASUREMENTS, MEASUREMENTS_OPTIONS } from '@/constants/selections'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  initializeCustomMeasurements,
  resetCustomMeasurements,
  setSelectedMeasure,
} from '@/redux/selections/selections.actions'
import { getCustomMeasurements, getSelectedGarment, getSelectedMeasure } from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

const getInitialMeasurements = (garmentType: CLOTHES, size: MEASUREMENTS, measurements: Record<string, number>) => {
  if (measurements && Object.keys(measurements).length) {
    return measurements
  }
  return GARMENT_MEASUREMENTS[garmentType][size]
}

export const MeasurementScreen = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const selectedGarment = useAppSelector(getSelectedGarment) as CLOTHES
  const size = useAppSelector(getSelectedMeasure) as MEASUREMENTS
  const customMeasurements = useAppSelector(getCustomMeasurements)
  const [isCustom, setIsCustom] = useState(Object.keys(customMeasurements).length > 0)

  const initialMeasurements = getInitialMeasurements(selectedGarment, size, customMeasurements)
  const handleSelection = (option: string) => {
    dispatch(setSelectedMeasure(option))
    dispatch(resetCustomMeasurements())
  }

  const handleNext = () => {
    router.push('/(auth)/(tabs)/fabric')
  }

  const handleSetIsCustom = (value: boolean) => {
    setIsCustom(value)
    if (value) {
      const defaultMeasurements = GARMENT_MEASUREMENTS[selectedGarment][size]
      dispatch(initializeCustomMeasurements(defaultMeasurements))
    } else {
      dispatch(resetCustomMeasurements())
    }
  }

  useEffect(() => {
    const newState = Object.keys(customMeasurements).length > 0
    if (isCustom !== newState) {
      setIsCustom(newState)
    }
  }, [customMeasurements, isCustom])

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={'Adjust Measurements'} backAction />
      <ScrollView style={styles.body}>
        <Preview />
        <View style={styles.selectionContainer}>
          <SelectionGroupButton
            options={MEASUREMENTS_OPTIONS}
            onSelect={handleSelection}
            selected={size}
            disabled={isCustom}
          />
        </View>
        <View style={styles.customizeTitle}>
          <Text variant="titleLarge">{i18n.t('Customize your size')}</Text>
          <Switch value={isCustom} onValueChange={handleSetIsCustom} />
        </View>
        <View>
          {selectedGarment === CLOTHES.Pants && (
            <PantsMeausurement isEditable={isCustom} values={initialMeasurements as PantsMeasurementValues} />
          )}
          {selectedGarment === CLOTHES.Vest && (
            <VestMeausurement isEditable={isCustom} values={initialMeasurements as VestMeasurementValues} />
          )}
          {selectedGarment === CLOTHES.Coat && (
            <CoatMeausurement isEditable={isCustom} values={initialMeasurements as CoatMeasurementValues} />
          )}
        </View>
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={handleNext}>
            {i18n.t('Next')}
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
  selectionContainer: {
    marginVertical: 16,
  },
  navigationButton: {
    marginTop: 20,
    marginBottom: 60,
  },
  customizeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
})
