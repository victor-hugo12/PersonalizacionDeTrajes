import firestoreModule from '@react-native-firebase/firestore'

import { Order, OrderData, OrderStatus } from '@/models/orderData'

const db = firestoreModule()

const ORDERS = 'orders'

interface FirestoreOrderData {
  userId: string
  garment: string
  color: string
  fabric: string
  measurument: Record<string, number>
  customOptions: Record<string, string>
  status: string
  created: string
  updated: string
}

const transformOrderData = (data: FirestoreOrderData): OrderData => {
  return {
    ...data,
    status: data.status as OrderStatus,
  }
}

export const getOrders = async (userId: string): Promise<Order[]> => {
  const snapshot = await db.collection(ORDERS).where('userId', '==', userId).orderBy('updated', 'desc').get()
  return snapshot.docs.map(doc => {
    const data = doc.data() as FirestoreOrderData
    return {
      id: doc.id,
      ...transformOrderData(data),
    }
  })
}

export const getOrder = async (id: string): Promise<Order> => {
  const doc = await db.collection(ORDERS).doc(id).get()
  const data = doc.data() as FirestoreOrderData
  if (!data) throw new Error(`Order with id ${id} not found`)
  return {
    id: doc.id,
    ...transformOrderData(data),
  }
}

export const addOrder = async (data: OrderData) => {
  const docRef = await db.collection(ORDERS).add(data)
  return await getOrder(docRef.id)
}

export const updateOrder = async (id: string, data: Partial<OrderData>) => {
  await db.collection(ORDERS).doc(id).update(data)
  return await getOrder(id)
}

export const deleteOrder = async (id: string) => {
  return await db.collection(ORDERS).doc(id).delete()
}
