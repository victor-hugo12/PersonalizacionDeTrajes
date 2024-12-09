import { Formik, FormikHandlers, FormikHelpers } from 'formik'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { HelperText, IconButton, TextInput } from 'react-native-paper'

import i18n from '@/language'
import { useAppDispatch } from '@/redux/hooks'
import { updateCustomMeasurements } from '@/redux/selections/selections.actions'
import { isDecimal } from '@/utils/utils'

import { Instructions } from '../Instructions'
import en from './en.json'
import es from './es.json'
import { PantsSchema } from './schema'

i18n.store(en)
i18n.store(es)

export interface PantsMeasurementValues {
  hem: number
  knee: number
  thigh: number
  waist: number
  length: number
  inseam: number
}

interface Props {
  isEditable?: boolean
  values: PantsMeasurementValues
}

export const PantsMeausurement: React.FC<Props> = ({ isEditable = true, values }) => {
  const dispatch = useAppDispatch()
  const initialValues: PantsMeasurementValues = { ...values }

  const [modalVisible, setModalVisible] = useState(false)
  const [modalImages, setModalImages] = useState<number[]>([])
  const [modalInstructions, setModalInstructions] = useState<string[]>([])

  const imageSets = {
    hem: [require('@/assets/images/hemCoatVest2.png'), require('@/assets/images/hemCoatVest2.png')],
    knee: [require('@/assets/images/kneePants.png'), require('@/assets/images/kneePants.png')],
    thigh: [require('@/assets/images/thighPants.png'), require('@/assets/images/thighPants.png')],
    waist: [require('@/assets/images/waistPants.png'), require('@/assets/images/waistPants.png')],
    length: [require('@/assets/images/lenghtPants1.png'), require('@/assets/images/lenghtPants2.png')],
    inseam: [require('@/assets/images/shotPants1.png'), require('@/assets/images/shotPants3.png')],
  }

  const instructionSets = {
    hem: ['measure_hem_1', 'measure_hem_2'],
    knee: ['measure_knee_1', 'measure_knee_2'],
    thigh: ['measure_thigh_1', 'measure_thigh_2'],
    waist: ['measure_waist_1', 'measure_waist_2'],
    length: ['measure_length_pants1', 'measure_length_pants2'],
    inseam: ['measure_inseam_1', 'measure_inseam_2'],
  }

  const handleOpenModal = (field: keyof typeof imageSets) => {
    setModalImages(imageSets[field])
    setModalInstructions(instructionSets[field])
    setModalVisible(true)
  }

  const handleNumericChange = (handleChange: FormikHandlers['handleChange'], fieldName: string) => (text: string) => {
    if (isDecimal(text)) {
      handleChange(fieldName)(text)
    }
  }

  const handleBlurReset =
    (
      field: keyof PantsMeasurementValues,
      values: PantsMeasurementValues,
      errors: Record<string, string>,
      setFieldValue: FormikHelpers<PantsMeasurementValues>['setFieldValue'],
    ) =>
    () => {
      let value = values[field]
      if (errors[field]) {
        value = initialValues[field]
        setFieldValue(field, value)
      }
      dispatch(updateCustomMeasurements({ key: field, value }))
    }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          enableReinitialize={true}
          validationSchema={PantsSchema}
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          {({ handleChange, values, errors, setFieldValue }) => (
            <>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('hem')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'hem')}
                    onBlur={handleBlurReset('hem', values, errors, setFieldValue)}
                    value={String(values.hem)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('hem')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.hem && errors.hem && (
                    <HelperText type="error" visible={Boolean(errors.hem)}>
                      {errors.hem}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('knee')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'knee')}
                    onBlur={handleBlurReset('knee', values, errors, setFieldValue)}
                    value={String(values.knee)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('knee')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.knee && errors.knee && (
                    <HelperText type="error" visible={Boolean(errors.knee)}>
                      {errors.knee}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('thigh')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'thigh')}
                    onBlur={handleBlurReset('thigh', values, errors, setFieldValue)}
                    value={String(values.thigh)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('thigh')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.thigh && (
                    <HelperText type="error" visible={Boolean(errors.thigh)}>
                      {errors.thigh}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('waist')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'waist')}
                    onBlur={handleBlurReset('waist', values, errors, setFieldValue)}
                    value={String(values.waist)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('waist')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.waist && (
                    <HelperText type="error" visible={Boolean(errors.waist)}>
                      {errors.waist}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('length')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'length')}
                    onBlur={handleBlurReset('length', values, errors, setFieldValue)}
                    value={String(values.length)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('length')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.length && (
                    <HelperText type="error" visible={Boolean(errors.length)}>
                      {errors.length}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('inseam')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'inseam')}
                    onBlur={handleBlurReset('inseam', values, errors, setFieldValue)}
                    value={String(values.inseam)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('inseam')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.inseam && (
                    <HelperText type="error" visible={Boolean(errors.inseam)}>
                      {errors.inseam}
                    </HelperText>
                  )}
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <Instructions
        images={modalImages}
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        instructions={modalInstructions}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 0,
  },
  inputView: {
    flexDirection: 'column',
    flex: 1,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
  buttonContent: {
    width: 30,
    height: 30,
    borderRadius: 5,
    padding: 0,
  },
})
