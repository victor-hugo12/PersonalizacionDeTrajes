import authModule, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

const auth = authModule()

export const useAuthentication = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = auth.onAuthStateChanged(async user => {
      console.info('onAuthStateChanged user ', user)
      setUser(user)
    })

    return unsubscribeFromAuthStatusChanged
  }, [])

  return {
    user,
  }
}
