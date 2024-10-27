import { createReducer } from '@reduxjs/toolkit'

import { decrement, increment, reset } from './counter.actions'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterReducer = createReducer(initialState, builder => {
  builder
    .addCase(increment, state => {
      state.value += 1
    })
    .addCase(decrement, state => {
      state.value -= 1
    })
    .addCase(reset, state => {
      state.value = 0
    })
})
