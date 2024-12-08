import { createAsyncThunk } from '@reduxjs/toolkit'

import { Order, OrderData } from '@/models/orderData'
import * as firestoreOrder from '@/services/firestoreOrder'

export const createOrder = createAsyncThunk<Order, OrderData>(
  'orders/createOrder',
  async (data: OrderData, { rejectWithValue }) => {
    try {
      return await firestoreOrder.addOrder(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, data }: { id: string; data: OrderData }, { rejectWithValue }) => {
    try {
      return await firestoreOrder.updateOrder(id, data)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id: string, { rejectWithValue }) => {
  try {
    await firestoreOrder.deleteOrder(id)
    return id
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getOrder = createAsyncThunk('orders/getOrder', async (id: string, { rejectWithValue }) => {
  try {
    const order = await firestoreOrder.getOrder(id)
    return order
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getOrders = createAsyncThunk('orders/getOrders', async (_, { rejectWithValue }) => {
  try {
    return await firestoreOrder.getOrders()
  } catch (error) {
    return rejectWithValue(error)
  }
})
