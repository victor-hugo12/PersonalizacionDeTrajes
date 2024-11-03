import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Appearance, useColorScheme } from 'react-native'
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { darkColors, lightColors } from '@/constants/colors'

import { LoadingContextProvider } from './LoaderContext'

const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    ...lightColors.colors,
  },
}

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    ...darkColors.colors,
  },
}

export type ThemeType = 'dark' | 'light'

export type Theme = typeof lightTheme

export interface ThemeContextValue {
  theme: Theme
  themeType: ThemeType
  isDarkTheme: boolean
  toggleThemeType: () => void
  setThemeType: Dispatch<SetStateAction<ThemeType>>
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export interface ThemeContextProviderProps {
  children: ReactNode
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<ThemeType>(colorScheme ?? 'light')

  const toggleThemeType = useCallback(() => {
    setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType])
  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme])

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeType(colorScheme as ThemeType)
    })
    return () => listener.remove()
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent={true} />
      <SafeAreaView style={{ flex: 1 }}>
        <LoadingContextProvider>
          <ThemeProvider value={theme}>
            <PaperProvider theme={theme}>
              <ThemeContext.Provider
                value={{
                  theme,
                  themeType,
                  isDarkTheme,
                  setThemeType,
                  toggleThemeType,
                }}
              >
                {children}
              </ThemeContext.Provider>
            </PaperProvider>
          </ThemeProvider>
        </LoadingContextProvider>
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>
  )
}
