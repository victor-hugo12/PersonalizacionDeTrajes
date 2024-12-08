import { createReducer } from '@reduxjs/toolkit'

import { Order } from '@/models/orderData'

import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from './orders.actions'

interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
  orderCreated: boolean
  orderUpdated: boolean
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  orderCreated: false,
  orderUpdated: false,
}

const ordersReducer = createReducer(initialState, builder => {
  builder
    .addCase(getOrders.pending, state => {
      state.loading = true
      state.error = null
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to load orders'
    })
    .addCase(createOrder.pending, state => {
      state.loading = true
      state.error = null
      state.orderCreated = false
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false
      state.orders.push(action.payload)
      state.orderCreated = true
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to create order'
      state.orderCreated = false
    })
    .addCase(updateOrder.pending, state => {
      state.loading = true
      state.error = null
      state.orderUpdated = false
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false
      const index = state.orders.findIndex(order => order.id === action.payload.id)
      if (index !== -1) {
        state.orders[index] = action.payload
      }
      state.orderUpdated = true
    })
    .addCase(updateOrder.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to update order'
      state.orderUpdated = false
    })
    .addCase(deleteOrder.pending, state => {
      state.loading = true
      state.error = null
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false
      state.orders = state.orders.filter(order => order.id !== action.payload)
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to delete order'
    })
    .addCase(getOrder.pending, state => {
      state.loading = true
      state.error = null
    })
    .addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false
      const existingOrder = state.orders.find(order => order.id === action.payload.id)
      if (!existingOrder) {
        state.orders.push(action.payload)
      }
    })
    .addCase(getOrder.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to get order'
    })
})

export default ordersReducer
