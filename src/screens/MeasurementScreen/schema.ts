import * as yup from 'yup'

import { GarmentType } from '@/constants/selections'

// Definir máximos y mínimos dinámicos para cada campo dependiendo de la prenda
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

  // Construcción del esquema según la prenda seleccionada
  let schemaShape: Record<string, yup.Schema> = {}

  // Validaciones específicas para cada tipo de prenda
  if (garmentType === 'Vest') {
    schemaShape = {
      length: yup
        .number()
        .min(garmentMinimums.length, `Length must be at least ${garmentMinimums.length} cm`)
        .max(garmentMaximums.length, `Length must be at most ${garmentMaximums.length} cm`)
        .required('Length is required'),
      shoulder: yup
        .number()
        .min(garmentMinimums.shoulder, `Shoulder must be at least ${garmentMinimums.shoulder} cm`)
        .max(garmentMaximums.shoulder, `Shoulder must be at most ${garmentMaximums.shoulder} cm`)
        .required('Shoulder is required'),
      chest: yup
        .number()
        .min(garmentMinimums.chest, `Chest must be at least ${garmentMinimums.chest} cm`)
        .max(garmentMaximums.chest, `Chest must be at most ${garmentMaximums.chest} cm`)
        .required('Chest is required'),
    }
  } else if (garmentType === 'Pants') {
    schemaShape = {
      length: yup
        .number()
        .min(garmentMinimums.length, `Length must be at least ${garmentMinimums.length} cm`)
        .max(garmentMaximums.length, `Length must be at most ${garmentMaximums.length} cm`)
        .required('Length is required'),
      hem: yup
        .number()
        .min(garmentMinimums.hem, `Hem must be at least ${garmentMinimums.hem} cm`)
        .max(garmentMaximums.hem, `Hem must be at most ${garmentMaximums.hem} cm`)
        .test('hem-less-than-knee', 'Hem must not be greater than Knee', function (value) {
          const { knee } = this.parent
          return value !== undefined && knee !== undefined ? value <= knee : true
        })
        .required('Hem is required'),
      knee: yup
        .number()
        .min(garmentMinimums.knee, `Knee must be at least ${garmentMinimums.knee} cm`)
        .max(garmentMaximums.knee, `Knee must be at most ${garmentMaximums.knee} cm`)
        .test('knee-less-than-thigh', 'Knee must not be greater than thigh', function (value) {
          const { thigh } = this.parent
          return value !== undefined && thigh !== undefined ? value <= thigh : true
        })
        .required('Knee is required'),
      thigh: yup
        .number()
        .min(garmentMinimums.thigh, `Thigh must be at least ${garmentMinimums.thigh} cm`)
        .max(garmentMaximums.thigh, `Thigh must be at most ${garmentMaximums.thigh} cm`)
        .required('Thigh is required'),
      waist: yup
        .number()
        .min(garmentMinimums.waist, `Waist must be at least ${garmentMinimums.waist} cm`)
        .max(garmentMaximums.waist, `Waist must be at most ${garmentMaximums.waist} cm`)
        .required('Waist is required'),
      inseam: yup
        .number()
        .min(garmentMinimums.inseam, `Inseam must be at least ${garmentMinimums.inseam} cm`)
        .max(garmentMaximums.inseam, `Inseam must be at most ${garmentMaximums.inseam} cm`)
        .required('Inseam is required'),
    }
  } else if (garmentType === 'Coat') {
    schemaShape = {
      length: yup
        .number()
        .min(garmentMinimums.length, `Length must be at least ${garmentMinimums.length} cm`)
        .max(garmentMaximums.length, `Length must be at most ${garmentMaximums.length} cm`)
        .required('Length is required'),
      shoulder: yup
        .number()
        .min(garmentMinimums.shoulder, `Shoulder must be at least ${garmentMinimums.shoulder} cm`)
        .max(garmentMaximums.shoulder, `Shoulder must be at most ${garmentMaximums.shoulder} cm`)
        .required('Shoulder is required'),
      chest: yup
        .number()
        .min(garmentMinimums.chest, `Chest must be at least ${garmentMinimums.chest} cm`)
        .max(garmentMaximums.chest, `Chest must be at most ${garmentMaximums.chest} cm`)
        .required('Chest is required'),
      arm: yup
        .number()
        .min(garmentMinimums.arm, `Arm must be at least ${garmentMinimums.arm} cm`)
        .max(garmentMaximums.arm, `Arm must be at most ${garmentMaximums.arm} cm`)
        .required('Arm is required'),
    }
  }

  return yup.object().shape(schemaShape)
}
