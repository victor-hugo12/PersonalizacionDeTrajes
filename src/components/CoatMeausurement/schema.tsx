import * as yup from 'yup'

import i18n from '@/language'

const PANTS_FIELD_MINIMUMS = {
  length: 70,
  shoulder: 12,
  chest: 35,
  arm: 40,
}

const PANTS_FIELD_MAXIMUMS = {
  length: 200,
  shoulder: 70,
  chest: 150,
  arm: 90,
}

export const PantsSchema = yup.object().shape({
  length: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.length, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.length }))
    .max(PANTS_FIELD_MAXIMUMS.length, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.length }))
    .required('is required'),
  shoulder: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.shoulder, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.shoulder }))
    .max(PANTS_FIELD_MAXIMUMS.shoulder, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.shoulder }))
    .required('is required'),
  chest: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.chest, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.chest }))
    .max(PANTS_FIELD_MAXIMUMS.chest, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.chest }))
    .required('is required'),
  arm: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.arm, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.arm }))
    .max(PANTS_FIELD_MAXIMUMS.arm, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.arm }))
    .required('is required'),
})
