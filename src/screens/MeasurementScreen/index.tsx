import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { WHITE } from '@/constants/colors'
import {
  GARMENT_MEASUREMENTS,
  GarmentProps,
  GarmentType,
  getGarmentComponent,
  MEASUREMENTS,
} from '@/constants/selections'
import { setSelectedMeasure, updateCustomMeasurements } from '@/redux/selections/selections.actions'
import { getCustomMeasurements, getSelectedGarment, getSelectedMeasure } from '@/redux/selections/selections.selectors'
import { RootState } from '@/redux/store'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)
const convertToRecord = (props: GarmentProps): Record<string, number> => {
  return Object.fromEntries(Object.entries(props).filter(([_, value]) => typeof value === 'number'))
}

const sanitizeMeasurements = (garmentType: GarmentType, measurements: Partial<GarmentProps>): GarmentProps => {
  const defaultMeasurements = GARMENT_MEASUREMENTS[garmentType]?.measures.M as GarmentProps

  return {
    ...defaultMeasurements,
    ...measurements,
  }
}

export const MeasurementScreen = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const selectedGarment = useSelector(getSelectedGarment) as GarmentType
  const size = useSelector(getSelectedMeasure)
  const customMeasurements = useSelector(state => getCustomMeasurements(state as RootState, selectedGarment))

  const initialMeasurements = useMemo(() => {
    return sanitizeMeasurements(selectedGarment, customMeasurements || {})
  }, [selectedGarment, customMeasurements])

  const [measurements, setMeasurements] = useState(initialMeasurements)
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(initialMeasurements).map(([key, value]) => [key, value.toString()])),
  )

  const SelectedGarmentComponent = getGarmentComponent(selectedGarment)

  useEffect(() => {
    const garmentMeasurements = customMeasurements || {}
    setMeasurements(sanitizeMeasurements(selectedGarment, garmentMeasurements))
    setInputValues(
      Object.fromEntries(Object.entries(garmentMeasurements).map(([key, value]) => [key, value.toString()])),
    )
  }, [selectedGarment, customMeasurements])

  const handleInputChange = (key: string, value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))

    if (!isNaN(numericValue)) {
      setInputValues(prev => ({ ...prev, [key]: value }))
      setMeasurements(prev => ({ ...prev, [key]: numericValue }))
    } else {
      setInputValues(prev => ({ ...prev, [key]: value }))
      setMeasurements(prev => ({ ...prev, [key]: 0 }))
    }
  }

  const handleSelection = (option: string) => {
    dispatch(setSelectedMeasure(option))
    const rawMeasurements =
      GARMENT_MEASUREMENTS[selectedGarment]?.measures[
        option as keyof (typeof GARMENT_MEASUREMENTS)[GarmentType]['measures']
      ] || {}
    const sanitized = sanitizeMeasurements(selectedGarment, rawMeasurements)
    const sanitizedRecord = convertToRecord(sanitized)
    setMeasurements(sanitized)
    const newInputValues = Object.fromEntries(Object.entries(sanitized).map(([key, value]) => [key, value.toString()]))
    setInputValues(newInputValues)
    dispatch(updateCustomMeasurements({ garmentType: selectedGarment, measurements: sanitizedRecord }))
  }

  const handleApplyChanges = () => {
    const sanitizedRecord = convertToRecord(measurements)
    dispatch(updateCustomMeasurements({ garmentType: selectedGarment, measurements: sanitizedRecord }))
  }

  const handleNext = () => {
    const sanitizedRecord = convertToRecord(measurements)
    dispatch(updateCustomMeasurements({ garmentType: selectedGarment, measurements: sanitizedRecord }))
    router.push('/(auth)/(tabs)/fabric')
  }

  const renderSVGComponent = () => {
    const sanitized = sanitizeMeasurements(selectedGarment, measurements)
    return SelectedGarmentComponent ? <SelectedGarmentComponent {...sanitized} width={300} height={300} /> : null
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={i18n.t('Adjust Measurements')} backAction />
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: WHITE }]}>{renderSVGComponent()}</View>
        </View>
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your size')}</Text>
          <PaperButton mode="contained" dark onPress={handleApplyChanges}>
            {i18n.t('Apply')}
          </PaperButton>
        </View>

        <SelectionGroupButton options={[...MEASUREMENTS]} onSelect={handleSelection} selected={size} />
        <ScrollView style={styles.inputsContainer}>
          {Object.entries(measurements).map(([key]) => (
            <View key={key} style={styles.inputWrapper}>
              <Text>{i18n.t(key)}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={inputValues[key] || ''}
                onChangeText={val => handleInputChange(key, val)}
              />
            </View>
          ))}
          <View style={styles.navigationButton}>
            <PaperButton mode="contained" dark onPress={handleNext}>
              {i18n.t('Next')}
            </PaperButton>
          </View>
        </ScrollView>
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
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputsContainer: {
    flex: 1,
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    flex: 1,
    textAlign: 'right',
  },
  input: {
    flex: 2,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    textAlign: 'right',
  },
  navigationButton: {
    marginTop: 20,
  },
  titleSelect: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
