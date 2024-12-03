import { createReducer } from '@reduxjs/toolkit'

import { CLOTHES_OPTIONS, COLORS, FABRICS, MEASUREMENTS_OPTIONS } from '@/constants/selections'

import {
  initializeCustomMeasurements,
  resetColor,
  resetCustomMeasurements,
  resetFabric,
  resetGarment,
  resetMeasure,
  setSelectedColor,
  setSelectedFabric,
  setSelectedGarment,
  setSelectedMeasure,
  updateCustomMeasurements,
} from './selections.actions'

interface SelectionState {
  garment: string
  measure: string
  color: string
  fabric: string
  customMeasurements: Record<string, number>
}

const initialState: SelectionState = {
  garment: CLOTHES_OPTIONS[0].value,
  measure: MEASUREMENTS_OPTIONS[0].value,
  color: COLORS[0],
  fabric: FABRICS[0],
  customMeasurements: {},
}

export const selectionsReducer = createReducer(initialState, builder => {
  builder
    .addCase(setSelectedGarment, (state, action) => {
      state.garment = action.payload
    })
    .addCase(resetGarment, state => {
      state.garment = CLOTHES_OPTIONS[0].value
    })
    .addCase(setSelectedMeasure, (state, action) => {
      state.measure = action.payload
    })
    .addCase(resetMeasure, state => {
      state.measure = MEASUREMENTS_OPTIONS[0].value
    })
    .addCase(setSelectedColor, (state, action) => {
      state.color = action.payload
    })
    .addCase(resetColor, state => {
      state.color = COLORS[0]
    })
    .addCase(setSelectedFabric, (state, action) => {
      state.fabric = action.payload
    })
    .addCase(resetFabric, state => {
      state.fabric = FABRICS[0]
    })
    .addCase(initializeCustomMeasurements, (state, action) => {
      state.customMeasurements = { ...action.payload }
    })
    .addCase(updateCustomMeasurements, (state, action) => {
      const { key, value } = action.payload
      state.customMeasurements[key] = value
    })
    .addCase(resetCustomMeasurements, state => {
      state.customMeasurements = {}
    })
})
