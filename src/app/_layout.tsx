import { useFonts } from 'expo-font'
import { Slot, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import 'react-native-reanimated'
import { Provider } from 'react-redux'

import { ThemedView } from '@/components/ThemedView'
import '@/config/firebase'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { useAuthentication } from '@/hooks/useAuthentication'
import { store } from '@/redux/store'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  })

  const { user, loading } = useAuthentication()
  const router = useRouter()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync()
      router.replace(user ? '/(auth)/(tabs)/home' : '/login')
    }
  }, [loaded, loading, router, user])

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Slot />
      </ThemeContextProvider>
    </Provider>
  )
}
