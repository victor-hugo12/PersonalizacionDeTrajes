import { Formik, FormikHandlers, FormikHelpers } from 'formik'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

import i18n from '@/language'
import { useAppDispatch } from '@/redux/hooks'
import { updateCustomMeasurements } from '@/redux/selections/selections.actions'
import { isDecimal } from '@/utils/utils'

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
                  <TextInput
                    label={i18n.t('length')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'length')}
                    onBlur={handleBlurReset('length', values, errors, setFieldValue)}
                    value={String(values.length)}
                    editable={isEditable}
                  />
                  {errors.length && (
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
                  <TextInput
                    label={i18n.t('chest')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'chest')}
                    onBlur={handleBlurReset('chest', values, errors, setFieldValue)}
                    value={String(values.chest)}
                    editable={isEditable}
                  />
                  {errors.chest && (
                    <HelperText type="error" visible={Boolean(errors.chest)}>
                      {errors.chest}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label={i18n.t('arm')}
                    mode="outlined"
                    onChangeText={handleNumericChange(handleChange, 'arm')}
                    onBlur={handleBlurReset('arm', values, errors, setFieldValue)}
                    value={String(values.arm)}
                    editable={isEditable}
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 10,
  },
  inputView: {
    flex: 1,
  },
})
