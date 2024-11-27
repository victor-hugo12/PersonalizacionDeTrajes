import { createAction } from '@reduxjs/toolkit'

import { GarmentType } from '@/constants/selections'

// Acciones existentes
export const setSelectedGarment = createAction<string>('selections/setSelectedGarment')
export const resetGarment = createAction('selections/resetGarment')

export const setSelectedMeasure = createAction<string>('selections/setSelectedMeasure')
export const resetMeasure = createAction('selections/resetMeasure')

export const setSelectedColor = createAction<string>('selections/setSelectedColor')
export const resetColor = createAction('selections/resetColor')

export const setSelectedFabric = createAction<string>('selections/setSelectedFabric')
export const resetFabric = createAction('selections/resetFabric')
export const updateCustomMeasurements = createAction<{
  garmentType: GarmentType
  measurements: Record<string, number>
}>('selections/updateCustomMeasurements')
