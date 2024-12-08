import firestoreModule from '@react-native-firebase/firestore'

import { UserData } from '@/models/userData'

const db = firestoreModule()

const USERS = 'users'

export const getUser = async (id: string): Promise<UserData> => {
  return (await db.collection(USERS).doc(id).get()).data() as UserData
}

export const addUser = async (id: string, data: UserData) => {
  await db.collection(USERS).doc(id).set(data)
  return await getUser(id)
}

export const updateUser = async (id: string, data: UserData) => {
  await db.collection(USERS).doc(id).update(data)
  return await getUser(id)
}

export const deleteUser = async (id: string) => {
  return await db.collection(USERS).doc(id).delete()
}
