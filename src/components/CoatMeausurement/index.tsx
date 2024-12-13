import { Formik, FormikHandlers, FormikHelpers } from 'formik'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { HelperText, IconButton } from 'react-native-paper'

import { imageSets, instructionSets } from '@/constants/selections'
import i18n from '@/language'
import { useAppDispatch } from '@/redux/hooks'
import { updateCustomMeasurements } from '@/redux/selections/selections.actions'
import { isDecimal } from '@/utils/utils'

import CustomTextInput from '../CustomTextInput'
import { Instructions } from '../Instructions'
import { PantsSchema } from './schema'

export interface CoatMeasurementValues {
  length: number
  shoulder: number
  chest: number
  arm: number
}

interface Props {
  isEditable?: boolean
  values: CoatMeasurementValues
}

export const CoatMeausurement: React.FC<Props> = ({ isEditable = true, values }) => {
  const dispatch = useAppDispatch()
  const initialValues: CoatMeasurementValues = { ...values }

  const [modalVisible, setModalVisible] = useState(false)
  const [modalImages, setModalImages] = useState<number[]>([])
  const [modalInstructions, setModalInstructions] = useState<string[]>([])

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
      field: keyof CoatMeasurementValues,
      values: CoatMeasurementValues,
      errors: Record<string, string>,
      setFieldValue: FormikHelpers<CoatMeasurementValues>['setFieldValue'],
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
                    label={i18n.t('shoulder')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'shoulder')}
                    onBlur={handleBlurReset('shoulder', values, errors, setFieldValue)}
                    value={String(values.shoulder)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('shoulder')}
                  />
                  {errors.shoulder && (
                    <HelperText type="error" visible={Boolean(errors.shoulder)}>
                      {errors.shoulder}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('chest')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'chest')}
                    onBlur={handleBlurReset('chest', values, errors, setFieldValue)}
                    value={String(values.chest)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('chest')}
                  />
                  {errors.chest && (
                    <HelperText type="error" visible={Boolean(errors.chest)}>
                      {errors.chest}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <CustomTextInput
                    label={i18n.t('arm')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'arm')}
                    onBlur={handleBlurReset('arm', values, errors, setFieldValue)}
                    value={String(values.arm)}
                    editable={isEditable}
                    disabled={!isEditable}
                    keyboardType="decimal-pad"
                  />
                  <IconButton
                    icon="information"
                    size={20}
                    style={styles.button}
                    onPress={() => handleOpenModal('arm')}
                  />
                  {errors.arm && (
                    <HelperText type="error" visible={Boolean(errors.arm)}>
                      {errors.arm}
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
