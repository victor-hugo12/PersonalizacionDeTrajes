import { createReducer } from '@reduxjs/toolkit'

import { Order } from '@/models/orderData'
import { RequestStatus } from '@/models/requestStatus'

import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  resetCreateOrderStatus,
  resetDeleteOrderStatus,
  resetGetOrdersStatus,
  resetGetOrderStatus,
  resetRequestStatuses,
  resetUpdateOrderStatus,
  updateOrder,
} from './orders.actions'

interface OrdersState {
  orders: Order[]
  error: string | null
  getOrdersStatus: RequestStatus
  createOrderStatus: RequestStatus
  updateOrderStatus: RequestStatus
  deleteOrderStatus: RequestStatus
  getOrderStatus: RequestStatus
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  getOrdersStatus: RequestStatus.INIT,
  createOrderStatus: RequestStatus.INIT,
  updateOrderStatus: RequestStatus.INIT,
  deleteOrderStatus: RequestStatus.INIT,
  getOrderStatus: RequestStatus.INIT,
}

const ordersReducer = createReducer(initialState, builder => {
  builder
    .addCase(getOrders.pending, state => {
      state.getOrdersStatus = RequestStatus.PENDING
      state.error = null
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.getOrdersStatus = RequestStatus.SUCCESS
      state.orders = action.payload
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.getOrdersStatus = RequestStatus.ERROR
      state.error = action.error.message || 'Failed to load orders'
    })
    .addCase(createOrder.pending, state => {
      state.createOrderStatus = RequestStatus.PENDING
      state.error = null
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orders.unshift(action.payload)
      state.createOrderStatus = RequestStatus.SUCCESS
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.createOrderStatus = RequestStatus.ERROR
      state.error = action.error.message || 'Failed to create order'
    })
    .addCase(updateOrder.pending, state => {
      state.updateOrderStatus = RequestStatus.PENDING
      state.error = null
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id)
      if (index !== -1) {
        state.orders[index] = action.payload
      }
      state.updateOrderStatus = RequestStatus.SUCCESS
    })
    .addCase(updateOrder.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to update order'
      state.updateOrderStatus = RequestStatus.ERROR
    })
    .addCase(deleteOrder.pending, state => {
      state.deleteOrderStatus = RequestStatus.PENDING
      state.error = null
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.deleteOrderStatus = RequestStatus.SUCCESS
      state.orders = state.orders.filter(order => order.id !== action.payload)
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.deleteOrderStatus = RequestStatus.ERROR
      state.error = action.error.message || 'Failed to delete order'
    })
    .addCase(getOrder.pending, state => {
      state.getOrderStatus = RequestStatus.PENDING
      state.error = null
    })
    .addCase(getOrder.fulfilled, (state, action) => {
      state.getOrderStatus = RequestStatus.SUCCESS
      const existingOrder = state.orders.find(order => order.id === action.payload.id)
      if (!existingOrder) {
        state.orders.push(action.payload)
      }
    })
    .addCase(getOrder.rejected, (state, action) => {
      state.getOrderStatus = RequestStatus.ERROR
      state.error = action.error.message || 'Failed to get order'
    })
    .addCase(resetGetOrderStatus, state => {
      state.getOrderStatus = RequestStatus.INIT
    })
    .addCase(resetGetOrdersStatus, state => {
      state.getOrdersStatus = RequestStatus.INIT
    })
    .addCase(resetCreateOrderStatus, state => {
      state.createOrderStatus = RequestStatus.INIT
    })
    .addCase(resetUpdateOrderStatus, state => {
      state.updateOrderStatus = RequestStatus.INIT
    })
    .addCase(resetDeleteOrderStatus, state => {
      state.deleteOrderStatus = RequestStatus.INIT
    })
    .addCase(resetRequestStatuses, state => {
      state.getOrdersStatus = RequestStatus.INIT
      state.createOrderStatus = RequestStatus.INIT
      state.updateOrderStatus = RequestStatus.INIT
      state.deleteOrderStatus = RequestStatus.INIT
      state.getOrderStatus = RequestStatus.INIT
      state.error = null
    })
})

export default ordersReducer
