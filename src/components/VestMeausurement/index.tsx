import { Formik, FormikHandlers, FormikHelpers } from 'formik'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { HelperText, IconButton, TextInput } from 'react-native-paper'

import i18n from '@/language'
import { useAppDispatch } from '@/redux/hooks'
import { updateCustomMeasurements } from '@/redux/selections/selections.actions'
import { isDecimal } from '@/utils/utils'

import { Instructions } from '../Instructions'
import { VestSchema } from './schema'

export interface VestMeasurementValues {
  length: number
  shoulder: number
  chest: number
}

interface Props {
  isEditable?: boolean
  values: VestMeasurementValues
}

export const VestMeausurement: React.FC<Props> = ({ isEditable = true, values }) => {
  const dispatch = useAppDispatch()
  const initialValues: VestMeasurementValues = { ...values }
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImages, setModalImages] = useState<number[]>([])
  const [modalInstructions, setModalInstructions] = useState<string[]>([])

  const imageSets = {
    length: [
      require('@/assets/images/lenghtCoat1.png'),
      require('@/assets/images/lenghtCoat2.png'),
      require('@/assets/images/lenghtCoat3.png'),
    ],
    shoulder: [require('@/assets/images/ShoulderCoatVest1.png'), require('@/assets/images/ShoulderCoatVest2.png')],
    chest: [require('@/assets/images/ChestCoatVest.png'), require('@/assets/images/ChestCoatVest.png')],
    arm: [require('@/assets/images/ArmCoatVest1.png'), require('@/assets/images/ArmCoatVest2.png')],
  }

  const instructionSets = {
    length: ['measure_length_1', 'measure_length_2', 'measure_length_2'],
    shoulder: ['measure_shoulder_1', 'measure_shoulder_2'],
    chest: ['measure_chest_1', 'measure_chest_2'],
    arm: ['measure_arm_1', 'measure_arm_2'],
    pants: ['measure_pants_flat'],
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
      field: keyof VestMeasurementValues,
      values: VestMeasurementValues,
      errors: Record<string, string>,
      setFieldValue: FormikHelpers<VestMeasurementValues>['setFieldValue'],
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
          validationSchema={VestSchema}
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          {({ handleChange, values, errors, setFieldValue }) => (
            <>
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

                  {errors.length && errors.length && (
                    <HelperText type="error" visible={Boolean(errors.length)}>
                      {errors.length}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('shoulder')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'shoulder')}
                    onBlur={handleBlurReset('shoulder', values, errors, setFieldValue)}
                    value={String(values.shoulder)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('length')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>
                  {errors.shoulder && errors.shoulder && (
                    <HelperText type="error" visible={Boolean(errors.shoulder)}>
                      {errors.shoulder}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('chest')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'chest')}
                    onBlur={handleBlurReset('chest', values, errors, setFieldValue)}
                    value={String(values.chest)}
                    editable={isEditable}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity onPress={() => handleOpenModal('length')} style={styles.buttonContainer}>
                    <IconButton icon="image" size={20} style={styles.buttonContent} />
                  </TouchableOpacity>

                  {errors.chest && (
                    <HelperText type="error" visible={Boolean(errors.chest)}>
                      {errors.chest}
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
