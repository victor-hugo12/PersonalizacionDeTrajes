import { RootState } from '../store'

export const getSelectedGarment = (state: RootState) => state.selections.garment
export const getSelectedMeasure = (state: RootState) => state.selections.measure
