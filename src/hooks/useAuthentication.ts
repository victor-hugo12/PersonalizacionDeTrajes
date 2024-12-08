import authModule from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

import { CustomUser } from '@/models/userData'
import { getUser } from '@/services/firestoreUser'

const auth = authModule()

export const useAuthentication = () => {
  const [user, setUser] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = auth.onAuthStateChanged(async user => {
      console.info('onAuthStateChanged user ', user)
      let customUser: CustomUser | null = null
      if (user) {
        const firestoreUserData = await getUser(user.uid)
        const { uid, email, displayName, photoURL } = user
        customUser = {
          id: uid,
          email: email as string,
          displayName: displayName || '',
          photoURL: photoURL || '',
          ...firestoreUserData,
        }
      }
      setUser(customUser)
      setLoading(false)
    })

    return unsubscribeFromAuthStatusChanged
  }, [])

  return {
    user,
    loading,
  }
}
