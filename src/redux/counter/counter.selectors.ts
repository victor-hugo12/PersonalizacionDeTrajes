import { RootState } from '../store'

export const selectCounterValue = (state: RootState) => state.counter.value
