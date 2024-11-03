import { createAction } from '@reduxjs/toolkit'

export const setSelectedGarment = createAction<string>('selections/setSelectedGarment')
export const resetGarment = createAction('selections/resetGarment')

export const setSelectedMeasure = createAction<string>('selections/setSelectedMeasure')
export const resetMeasure = createAction('selections/resetMeasure')
