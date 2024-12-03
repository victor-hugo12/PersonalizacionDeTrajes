import * as yup from 'yup'

import i18n from '@/language'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

const PANTS_FIELD_MINIMUMS = {
  length: 80,
  hem: 10,
  knee: 20,
  thigh: 25,
  waist: 20,
  inseam: 40,
}

const PANTS_FIELD_MAXIMUMS = {
  length: 200,
  hem: 50,
  knee: 80,
  thigh: 80,
  waist: 100,
  inseam: 90,
}

export const PantsSchema = yup.object().shape({
  hem: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.hem, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.hem }))
    .max(PANTS_FIELD_MAXIMUMS.hem, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.hem }))
    .test('hem-leq-knee', i18n.t('hem must not be greater than knee'), function (value?: number) {
      const { knee } = this.parent
      return value !== undefined && knee !== undefined ? value <= knee : true
    })
    .required('is required'),
  knee: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.knee, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.knee }))
    .max(PANTS_FIELD_MAXIMUMS.knee, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.knee }))
    .test('knee-less-than-thigh', i18n.t('knee must not be greater than thigh'), function (value?: number) {
      const { thigh } = this.parent
      return value !== undefined && thigh !== undefined ? value <= thigh : true
    })
    .required('is required'),
  thigh: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.thigh, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.thigh }))
    .max(PANTS_FIELD_MAXIMUMS.thigh, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.thigh }))
    .required('is required'),
  waist: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.waist, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.waist }))
    .max(PANTS_FIELD_MAXIMUMS.waist, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.waist }))
    .required('is required'),
  inseam: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.inseam, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.inseam }))
    .max(PANTS_FIELD_MAXIMUMS.inseam, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.inseam }))
    .required('is required'),
  length: yup
    .number()
    .min(PANTS_FIELD_MINIMUMS.length, i18n.t('at least %{value} cm', { value: PANTS_FIELD_MINIMUMS.length }))
    .max(PANTS_FIELD_MAXIMUMS.length, i18n.t('max %{value} cm', { value: PANTS_FIELD_MAXIMUMS.length }))
    .required('is required'),
})
