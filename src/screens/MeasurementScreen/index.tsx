import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'
import * as yup from 'yup'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { WHITE } from '@/constants/colors'
import {
  BORDER_COLORS,
  COLOR_VALUES,
  GARMENT_MEASUREMENTS,
  GarmentProps,
  GarmentType,
  getGarmentComponent,
  MEASUREMENTS,
} from '@/constants/selections'
import { setSelectedMeasure, updateCustomMeasurements } from '@/redux/selections/selections.actions'
import {
  getCustomMeasurements,
  getSelectedColor,
  getSelectedGarment,
  getSelectedMeasure,
} from '@/redux/selections/selections.selectors'
import { RootState } from '@/redux/store'

import { getValidationSchema } from './schema'

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
  const theme = useTheme()

  const dispatch = useDispatch()
  const router = useRouter()

  const selectedGarment = useSelector(getSelectedGarment) as GarmentType
  const size = useSelector(getSelectedMeasure)
  const customMeasurements = useSelector(state => getCustomMeasurements(state as RootState, selectedGarment))
  const selectedColor = useSelector(getSelectedColor)

  const fillColor = selectedColor ? COLOR_VALUES[selectedColor as keyof typeof COLOR_VALUES] : WHITE
  const strokeColor = selectedColor ? BORDER_COLORS[selectedColor as keyof typeof BORDER_COLORS] : WHITE
  const initialMeasurements = useMemo(() => {
    return sanitizeMeasurements(selectedGarment, customMeasurements || {})
  }, [selectedGarment, customMeasurements])

  const [measurements, setMeasurements] = useState(initialMeasurements)
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(initialMeasurements).map(([key, value]) => [key, value.toString()])),
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const SelectedGarmentComponent = getGarmentComponent(selectedGarment)

  useEffect(() => {
    setErrors({})
    const garmentMeasurements = customMeasurements || {}
    setMeasurements(sanitizeMeasurements(selectedGarment, garmentMeasurements))
    setInputValues(
      Object.fromEntries(Object.entries(garmentMeasurements).map(([key, value]) => [key, value.toString()])),
    )
  }, [selectedGarment, customMeasurements])

  const handleInputChange = (key: string, value: string) => {
    const validValue = value.replace(/[^0-9.]/g, '')
    setInputValues(prev => ({ ...prev, [key]: validValue }))

    const updatedMeasurements = {
      ...measurements,
      [key]: parseFloat(validValue) || 0,
    }

    const schema = getValidationSchema(selectedGarment)

    schema
      .validateAt(key, updatedMeasurements)
      .then(() => {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[key]
          return newErrors
        })

        setMeasurements(updatedMeasurements)
      })
      .catch((validationError: yup.ValidationError) => {
        setErrors(prev => ({
          ...prev,
          [key]: validationError.message,
        }))
      })
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

  const validateMeasurements = () => {
    const schema = getValidationSchema(selectedGarment)
    try {
      schema.validateSync(measurements, { abortEarly: false })
      return true
    } catch (error) {
      return false
    }
  }

  const handleApplyChanges = () => {
    if (validateMeasurements()) {
      const sanitizedRecord = convertToRecord(measurements)
      dispatch(updateCustomMeasurements({ garmentType: selectedGarment, measurements: sanitizedRecord }))
    } else {
      console.log('Invalid measurements, no changes applied.')
    }
  }

  const handleNext = () => {
    if (validateMeasurements()) {
      const sanitizedRecord = convertToRecord(measurements)
      dispatch(updateCustomMeasurements({ garmentType: selectedGarment, measurements: sanitizedRecord }))
      router.push('/(auth)/(tabs)/fabric')
    } else {
      console.log('Invalid measurements, cannot proceed.')
    }
  }

  const renderSVGComponent = () => {
    const sanitized = sanitizeMeasurements(selectedGarment, measurements)
    return SelectedGarmentComponent ? (
      <SelectedGarmentComponent
        {...sanitized}
        fillColor={fillColor}
        strokeColor={strokeColor}
        width={300}
        height={300}
      />
    ) : null
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={i18n.t('Adjust Measurements')} backAction />
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: WHITE }]}>{renderSVGComponent()}</View>
        </View>
        <SelectionGroupButton
          options={MEASUREMENTS.map(measurement => ({
            value: measurement,
            icon: undefined,
            color: undefined,
          }))}
          onSelect={handleSelection}
          selected={size}
        />
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your size')}</Text>
          <PaperButton mode="contained" dark onPress={handleApplyChanges}>
            {i18n.t('Apply')}
          </PaperButton>
        </View>
        <ScrollView style={styles.inputsContainer}>
          {Object.entries(measurements).map(([key]) => (
            <View key={key} style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{i18n.t(key)}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.background,
                    color: theme.dark ? 'white' : 'black',
                  },
                ]}
                keyboardType="numeric"
                value={inputValues[key] || ''}
                onChangeText={val => handleInputChange(key, val)}
              />
              {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
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
    marginTop: 5,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    flex: 1,
    marginRight: 10,
    textAlign: 'left',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    textAlign: 'right',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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
