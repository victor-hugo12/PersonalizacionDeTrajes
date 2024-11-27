import { createReducer } from '@reduxjs/toolkit'

import { CLOTHES, COLORS, FABRICS, GarmentType, MEASUREMENTS } from '@/constants/selections'

import {
  resetColor,
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
  customMeasurements: Record<GarmentType, Record<string, number>> // Nuevo campo
}

const initialState: SelectionState = {
  garment: CLOTHES[0],
  measure: MEASUREMENTS[0],
  color: COLORS[0],
  fabric: FABRICS[0],
  customMeasurements: {
    Pants: { hem: 18, knee: 24, thigh: 32, waist: 24, length: 92, inseam: 70 }, // Inicia vacío
    Vest: { length: 70, shoulder: 13, chest: 50 },
    Coat: { length: 70, shoulder: 13, chest: 50, arm: 50 },
  },
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
    .addCase(updateCustomMeasurements, (state, action) => {
      const { garmentType, measurements } = action.payload
      state.customMeasurements[garmentType] = measurements // Guardar medidas personalizadas
    })
})
