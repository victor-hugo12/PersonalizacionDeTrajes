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

import { toastConfig } from '@/config/ToastConfig'
import { darkColors, lightColors } from '@/constants/colors'

import { LanguageContextProvider } from './LanguageContext'
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
export const THEME_DARK: ThemeType = 'dark'
export const THEME_LIGHT: ThemeType = 'light'

export type Theme = typeof lightTheme

export interface ThemeContextValue {
  theme: Theme
  themeType: ThemeType
  isDarkTheme: boolean
  isSystemTheme: boolean
  toggleThemeType: () => void
  setThemeType: Dispatch<SetStateAction<ThemeType>>
  setIsSystemTheme: Dispatch<SetStateAction<boolean>>
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: THEME_LIGHT,
  isDarkTheme: true,
  isSystemTheme: true,
  setThemeType: () => {},
  toggleThemeType: () => {},
  setIsSystemTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export interface ThemeContextProviderProps {
  children: ReactNode
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<ThemeType>(THEME_DARK)
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(true)

  const toggleThemeType = useCallback(() => {
    setThemeType(prev => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK))
  }, [])

  const isDarkTheme = useMemo(() => {
    if (isSystemTheme) {
      return colorScheme === THEME_DARK
    }
    return themeType === THEME_DARK
  }, [colorScheme, isSystemTheme, themeType])
  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme])

  useEffect(() => {
    if (isSystemTheme) {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setThemeType(colorScheme as ThemeType)
      })
      return () => listener.remove()
    }
  }, [isSystemTheme])

  return (
    <SafeAreaProvider>
      <StatusBar style={THEME_DARK} translucent={true} />
      <LanguageContextProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <LoadingContextProvider>
            <ThemeProvider value={theme}>
              <PaperProvider theme={theme}>
                <ThemeContext.Provider
                  value={{
                    theme,
                    themeType,
                    isDarkTheme,
                    isSystemTheme,
                    setThemeType,
                    toggleThemeType,
                    setIsSystemTheme,
                  }}
                >
                  {children}
                </ThemeContext.Provider>
              </PaperProvider>
            </ThemeProvider>
          </LoadingContextProvider>
        </SafeAreaView>
      </LanguageContextProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  )
}
