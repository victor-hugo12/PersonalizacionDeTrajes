import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Order, OrderData, OrderStatus } from '@/models/orderData'
import * as firestoreOrder from '@/services/firestoreOrder'

export const createOrder = createAsyncThunk<Order, OrderData>(
  'orders/createOrder',
  async (data: OrderData, { rejectWithValue }) => {
    try {
      const res2 = await firestoreOrder.addOrder(data)
      return res2
    } catch (error) {
      let message = 'Error on createOrder action'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  },
)

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, data }: { id: string; data: Partial<OrderData> }, { rejectWithValue }) => {
    try {
      return await firestoreOrder.updateOrder(id, data)
    } catch (error) {
      let message = 'Error on updateOrder action'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  },
)

export const deleteOrder = createAsyncThunk<string, string>(
  'orders/deleteOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      await firestoreOrder.deleteOrder(id)
      return id
    } catch (error) {
      let message = 'Error on deleteOrder action'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  },
)

export const getOrder = createAsyncThunk<Order, string>('orders/getOrder', async (id: string, { rejectWithValue }) => {
  try {
    const order = await firestoreOrder.getOrder(id)
    return order
  } catch (error) {
    let message = 'Error on getOrder action'
    if (error instanceof Error) {
      message = error.message
    }
    return rejectWithValue(message)
  }
})

export const getOrders = createAsyncThunk<Order[], string>(
  'orders/getOrders',
  async (id: string, { rejectWithValue }) => {
    try {
      return await firestoreOrder.getOrders(id)
    } catch (error) {
      let message = 'Error on getOrders action'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  },
)

export const resetGetOrdersStatus = createAction('orders/resetGetOrdersStatus')
export const resetCreateOrderStatus = createAction('orders/resetCreateOrderStatus')
export const resetUpdateOrderStatus = createAction('orders/resetUpdateOrderStatus')
export const resetDeleteOrderStatus = createAction('orders/resetDeleteOrderStatus')
export const resetGetOrderStatus = createAction('orders/resetGetOrderStatus')
export const resetRequestStatuses = createAction('orders/resetRequestStatuses')

export const cancelOrder = (orderId: string) =>
  updateOrder({
    id: orderId,
    data: { status: OrderStatus.Canceled },
  })

export const reactivateOrder = (orderId: string) =>
  updateOrder({
    id: orderId,
    data: { status: OrderStatus.Created },
  })

/* export const cancelOrder = createAsyncThunk<OrderPayload, string, { rejectValue: string }>(
  'orders/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      return { orderId, status: OrderStatus.Canceled }
    } catch (error) {
      let message = 'Error on cancelOrder action'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  },
)

export const reactivateOrder = createAsyncThunk<OrderPayload, string, { rejectValue: string }>(
  'orders/reactivateOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      return { orderId, status: OrderStatus.Created }
    } catch (error) {
      let message = 'Error on reactivateOrde action'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  },
)
 */
