import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import ordersReducer from './orders/orders.reducer'
import { selectionsReducer } from './selections/selections.reducer'

export const store = configureStore({
  reducer: {
    selections: selectionsReducer,
    orders: ordersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
