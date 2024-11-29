import * as yup from 'yup'

import { GarmentType } from '@/constants/selections'
import i18n from '@/language'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)
const FIELD_MINIMUMS_BY_GARMENT: Record<string, Record<string, number>> = {
  Vest: {
    length: 60,
    shoulder: 10,
    chest: 30,
  },
  Pants: {
    length: 80,
    hem: 10,
    knee: 20,
    thigh: 25,
    waist: 20,
    inseam: 40,
  },
  Coat: {
    length: 70,
    shoulder: 12,
    chest: 35,
    arm: 40,
  },
}

const FIELD_MAXIMUMS_BY_GARMENT: Record<string, Record<string, number>> = {
  Vest: {
    length: 200,
    shoulder: 50,
    chest: 120,
  },
  Pants: {
    length: 200,
    hem: 50,
    knee: 80,
    thigh: 80,
    waist: 80,
    inseam: 90,
  },
  Coat: {
    length: 200,
    shoulder: 70,
    chest: 150,
    arm: 90,
  },
}

export const getValidationSchema = (garmentType: GarmentType) => {
  const garmentMinimums = FIELD_MINIMUMS_BY_GARMENT[garmentType]
  const garmentMaximums = FIELD_MAXIMUMS_BY_GARMENT[garmentType]

  if (!garmentMinimums || !garmentMaximums) {
    throw new Error(`No minimum or maximum values found for garment type: ${garmentType}`)
  }

  let schemaShape: Record<string, yup.Schema> = {}

  if (garmentType === 'Vest') {
    schemaShape = {
      length: yup
        .number()
        .min(
          garmentMinimums.length,
          i18n.t('length') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.length} cm`,
        )
        .max(
          garmentMaximums.length,
          i18n.t('length') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.length} cm`,
        )
        .required(i18n.t('length') + ' ' + i18n.t('is required')),
      shoulder: yup
        .number()
        .min(
          garmentMinimums.shoulder,
          i18n.t('shoulder') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.shoulder} cm`,
        )
        .max(
          garmentMaximums.shoulder,
          i18n.t('shoulder') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.shoulder} cm`,
        )
        .required(i18n.t('shoulder') + ' ' + i18n.t('is required')),
      chest: yup
        .number()
        .min(garmentMinimums.chest, i18n.t('chest') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.chest} cm`)
        .max(garmentMaximums.chest, i18n.t('chest') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.chest} cm`)
        .required(i18n.t('chest') + ' ' + i18n.t('is required')),
    }
  } else if (garmentType === 'Pants') {
    schemaShape = {
      length: yup
        .number()
        .min(
          garmentMinimums.length,
          i18n.t('length') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.length} cm`,
        )
        .max(
          garmentMaximums.length,
          i18n.t('length') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.length} cm`,
        )
        .required(i18n.t('length') + ' ' + i18n.t('is required')),
      hem: yup
        .number()
        .min(garmentMinimums.hem, i18n.t('hem') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.hem} cm`)
        .max(garmentMaximums.hem, i18n.t('hem') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.hem} cm`)
        .test('hem-less-than-knee', i18n.t('hem') + ' ' + i18n.t('must not be greater than Knee'), function (value) {
          const { knee } = this.parent
          return value !== undefined && knee !== undefined ? value <= knee : true
        })
        .required(i18n.t('hem') + ' ' + i18n.t('is required')),
      knee: yup
        .number()
        .min(garmentMinimums.knee, i18n.t('knee') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.knee} cm`)
        .max(garmentMaximums.knee, i18n.t('knee') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.knee} cm`)
        .test(
          'knee-less-than-thigh',
          i18n.t('knee') + ' ' + i18n.t('must not be greater than thigh'),
          function (value) {
            const { thigh } = this.parent
            return value !== undefined && thigh !== undefined ? value <= thigh : true
          },
        )
        .required(i18n.t('knee') + ' ' + i18n.t('is required')),
      thigh: yup
        .number()
        .min(garmentMinimums.thigh, i18n.t('thigh') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.thigh} cm`)
        .max(garmentMaximums.thigh, i18n.t('thigh') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.thigh} cm`)
        .required(i18n.t('thigh') + ' ' + i18n.t('is required')),
      waist: yup
        .number()
        .min(garmentMinimums.waist, i18n.t('waist') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.waist} cm`)
        .max(garmentMaximums.waist, i18n.t('waist') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.waist} cm`)
        .required(i18n.t('waist') + ' ' + i18n.t('is required')),
      inseam: yup
        .number()
        .min(
          garmentMinimums.inseam,
          i18n.t('inseam') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.inseam} cm`,
        )
        .max(
          garmentMaximums.inseam,
          i18n.t('inseam') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.inseam} cm`,
        )
        .required(i18n.t('inseam') + ' ' + i18n.t('is required')),
    }
  } else if (garmentType === 'Coat') {
    schemaShape = {
      length: yup
        .number()
        .min(
          garmentMinimums.length,
          i18n.t('length') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.length} cm`,
        )
        .max(
          garmentMaximums.length,
          i18n.t('length') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.length} cm`,
        )
        .required(i18n.t('length') + ' ' + i18n.t('is required')),
      shoulder: yup
        .number()
        .min(
          garmentMinimums.shoulder,
          i18n.t('shoulder') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.shoulder} cm`,
        )
        .max(
          garmentMaximums.shoulder,
          i18n.t('shoulder') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.shoulder} cm`,
        )
        .required(i18n.t('shoulder') + ' ' + i18n.t('is required')),
      chest: yup
        .number()
        .min(garmentMinimums.chest, i18n.t('chest') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.chest} cm`)
        .max(garmentMaximums.chest, i18n.t('chest') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.chest} cm`)
        .required(i18n.t('chest') + ' ' + i18n.t('is required')),
      arm: yup
        .number()
        .min(garmentMinimums.arm, i18n.t('arm') + ' ' + i18n.t('must be at least') + ` ${garmentMinimums.arm} cm`)
        .max(garmentMaximums.arm, i18n.t('arm') + ' ' + i18n.t('must be at most') + ` ${garmentMaximums.arm} cm`)
        .required(i18n.t('arm') + ' ' + i18n.t('is required')),
    }
  }

  return yup.object().shape(schemaShape)
}
