import { RootState } from '../store'

export const getSelectedGarment = (state: RootState) => state.selections.garment
export const getSelectedMeasure = (state: RootState) => state.selections.measure

export const getSelectedColor = (state: RootState) => state.selections.color
export const getSelectedFabric = (state: RootState) => state.selections.fabric
export const getCustomMeasurements = (state: RootState) => state.selections.customMeasurements

export const getCustomOptions = (state: RootState) => state.selections.customOptions
