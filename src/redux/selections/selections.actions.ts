import { createAction } from '@reduxjs/toolkit'

export const setSelectedGarment = createAction<string>('selections/setSelectedGarment')
export const resetGarment = createAction('selections/resetGarment')

export const setSelectedMeasure = createAction<string>('selections/setSelectedMeasure')
export const resetMeasure = createAction('selections/resetMeasure')

export const setSelectedColor = createAction<string>('selections/setSelectedColor')
export const resetColor = createAction('selections/resetColor')

export const setSelectedFabric = createAction<string>('selections/setSelectedFabric')
export const resetFabric = createAction('selections/resetFabric')

export const initializeCustomMeasurements = createAction<Record<string, number>>(
  'selections/initializeCustomMeasurements',
)
export const updateCustomMeasurements = createAction<{
  key: string
  value: number
}>('selections/updateCustomMeasurements')
export const resetCustomMeasurements = createAction('selections/resetCustomMeasurements')

export const updateCustomOptions = createAction<{
  key: string
  value: string
}>('selections/updateCustomOptions')
export const resetCustomOptions = createAction('selections/resetCustomOptions')
