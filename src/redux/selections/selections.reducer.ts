import { createReducer } from '@reduxjs/toolkit'

import {
  CLOTHES,
  CLOTHES_OPTIONS,
  COLORS_OPTIONS,
  DEFAULT_OPTIONS_BY_GARMENT,
  FABRICS_OPTIONS,
  MEASUREMENTS_OPTIONS,
} from '@/constants/selections'

import {
  initializeCustomMeasurements,
  resetColor,
  resetCustomMeasurements,
  resetCustomOptions,
  resetFabric,
  resetGarment,
  resetMeasure,
  setSelectedColor,
  setSelectedFabric,
  setSelectedGarment,
  setSelectedMeasure,
  updateCustomMeasurements,
  updateCustomOptions,
} from './selections.actions'

interface SelectionState {
  garment: string
  measure: string
  color: string
  fabric: string
  customMeasurements: Record<string, number>
  customOptions: Record<string, string>
}

const initialState: SelectionState = {
  garment: CLOTHES_OPTIONS[0].value,
  measure: MEASUREMENTS_OPTIONS[0].value,
  color: COLORS_OPTIONS[0].value,
  fabric: FABRICS_OPTIONS[0].value,
  customMeasurements: {},
  customOptions: DEFAULT_OPTIONS_BY_GARMENT[CLOTHES.Pants],
}

export const selectionsReducer = createReducer(initialState, builder => {
  builder
    .addCase(setSelectedGarment, (state, action) => {
      state.garment = action.payload
      state.customOptions = DEFAULT_OPTIONS_BY_GARMENT[action.payload as CLOTHES]
    })
    .addCase(resetGarment, state => {
      state.garment = CLOTHES_OPTIONS[0].value
      state.customOptions = DEFAULT_OPTIONS_BY_GARMENT[CLOTHES_OPTIONS[0].value as CLOTHES]
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
      state.color = COLORS_OPTIONS[0].value
    })
    .addCase(setSelectedFabric, (state, action) => {
      state.fabric = action.payload
    })
    .addCase(resetFabric, state => {
      state.fabric = FABRICS_OPTIONS[0].value
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
    .addCase(updateCustomOptions, (state, action) => {
      const { key, value } = action.payload
      state.customOptions[key] = value
    })
    .addCase(resetCustomOptions, state => {
      state.customOptions = DEFAULT_OPTIONS_BY_GARMENT[state.garment as CLOTHES]
    })
})
