import * as yup from 'yup'

import i18n from '@/language'

const VEST_FIELD_MINIMUMS = {
  length: 60,
  shoulder: 10,
  chest: 30,
}

const VEST_FIELD_MAXIMUMS = {
  length: 200,
  shoulder: 50,
  chest: 80,
}

export const VestSchema = yup.object().shape({
  length: yup
    .number()
    .min(VEST_FIELD_MINIMUMS.length, i18n.t('at least %{value} cm', { value: VEST_FIELD_MINIMUMS.length }))
    .max(VEST_FIELD_MAXIMUMS.length, i18n.t('max %{value} cm', { value: VEST_FIELD_MAXIMUMS.length }))
    .required('is required'),
  shoulder: yup
    .number()
    .min(VEST_FIELD_MINIMUMS.shoulder, i18n.t('at least %{value} cm', { value: VEST_FIELD_MINIMUMS.shoulder }))
    .max(VEST_FIELD_MAXIMUMS.shoulder, i18n.t('max %{value} cm', { value: VEST_FIELD_MAXIMUMS.shoulder }))
    .required('is required'),
  chest: yup
    .number()
    .min(VEST_FIELD_MINIMUMS.chest, i18n.t('at least %{value} cm', { value: VEST_FIELD_MINIMUMS.chest }))
    .max(VEST_FIELD_MAXIMUMS.chest, i18n.t('max %{value} cm', { value: VEST_FIELD_MAXIMUMS.chest }))
    .required('is required'),
})
