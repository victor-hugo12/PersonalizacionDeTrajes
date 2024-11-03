import { createReducer } from '@reduxjs/toolkit'

import { CLOTHES, MEASUREMENTS } from '@/constants/selections'

import { resetGarment, resetMeasure, setSelectedGarment, setSelectedMeasure } from './selections.actions'

interface SelectionState {
  garment: string
  measure: string
}

const initialState: SelectionState = {
  garment: CLOTHES[0],
  measure: MEASUREMENTS[0],
}

export const selectionsReducer = createReducer(initialState, builder => {
  builder
    .addCase(setSelectedGarment, (state, action) => {
      state.garment = action.payload
    })
    .addCase(resetGarment, state => {
      state.garment = CLOTHES[0]
    })
    .addCase(setSelectedMeasure, (state, action) => {
      state.measure = action.payload
    })
    .addCase(resetMeasure, state => {
      state.measure = MEASUREMENTS[0]
    })
})
