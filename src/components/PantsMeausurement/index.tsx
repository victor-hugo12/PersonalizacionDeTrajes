import { Formik, FormikHandlers, FormikHelpers } from 'formik'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { HelperText, IconButton } from 'react-native-paper'

import { imagePantsSets, instructionPantsSets } from '@/constants/selections'
import i18n from '@/language'
import { useAppDispatch } from '@/redux/hooks'
import { updateCustomMeasurements } from '@/redux/selections/selections.actions'
import { isDecimal } from '@/utils/utils'

import CustomTextInput from '../CustomTextInput'
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

  const handleOpenModal = (field: keyof typeof imagePantsSets) => {
    setModalImages(imagePantsSets[field])
    setModalInstructions(instructionPantsSets[field])
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
                  <CustomTextInput
                    label={i18n.t('hem')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'hem')}
                    onBlur={handleBlurReset('hem', values, errors, setFieldValue)}
                    value={String(values.hem)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('hem')}
                  />
                  {errors.hem && errors.hem && (
                    <HelperText type="error" visible={Boolean(errors.hem)}>
                      {errors.hem}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('knee')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'knee')}
                    onBlur={handleBlurReset('knee', values, errors, setFieldValue)}
                    value={String(values.knee)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('knee')}
                  />
                  {errors.knee && errors.knee && (
                    <HelperText type="error" visible={Boolean(errors.knee)}>
                      {errors.knee}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('thigh')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'thigh')}
                    onBlur={handleBlurReset('thigh', values, errors, setFieldValue)}
                    value={String(values.thigh)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('thigh')}
                  />
                  {errors.thigh && (
                    <HelperText type="error" visible={Boolean(errors.thigh)}>
                      {errors.thigh}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('waist')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'waist')}
                    onBlur={handleBlurReset('waist', values, errors, setFieldValue)}
                    value={String(values.waist)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('waist')}
                  />
                  {errors.waist && (
                    <HelperText type="error" visible={Boolean(errors.waist)}>
                      {errors.waist}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('length')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'length')}
                    onBlur={handleBlurReset('length', values, errors, setFieldValue)}
                    value={String(values.length)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('length')}
                  />
                  {errors.length && (
                    <HelperText type="error" visible={Boolean(errors.length)}>
                      {errors.length}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('inseam')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'inseam')}
                    onBlur={handleBlurReset('inseam', values, errors, setFieldValue)}
                    value={String(values.inseam)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('inseam')}
                  />
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
  button: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
})
