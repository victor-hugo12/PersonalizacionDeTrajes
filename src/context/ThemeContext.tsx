import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { LoadingContextProvider } from './LoaderContext'

const lightColors = {
  colors: {
    primary: 'rgb(32,130,232)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(212, 227, 255)',
    onPrimaryContainer: 'rgb(0, 28, 58)',
    secondary: 'rgb(84, 95, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(216, 227, 248)',
    onSecondaryContainer: 'rgb(17, 28, 43)',
    tertiary: 'rgb(110, 86, 118)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(247, 216, 255)',
    onTertiaryContainer: 'rgb(39, 20, 48)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 252, 255)',
    onBackground: 'rgb(26, 28, 30)',
    surface: 'rgb(240, 244, 251)',
    onSurface: 'rgb(26, 28, 30)',
    surfaceVariant: 'rgb(224, 226, 236)',
    onSurfaceVariant: 'rgb(67, 71, 78)',
    outline: 'rgb(116, 119, 127)',
    outlineVariant: 'rgb(195, 198, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 48, 51)',
    inverseOnSurface: 'rgb(241, 240, 244)',
    inversePrimary: 'rgb(165, 200, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(240, 244, 251)',
      level2: 'rgb(233, 239, 249)',
      level3: 'rgb(225, 235, 246)',
      level4: 'rgb(223, 233, 245)',
      level5: 'rgb(218, 230, 244)',
    },
    surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    backdrop: 'rgba(45, 49, 56, 0.4)',
    backgroundList: 'rgb(154, 215, 121)',
    onBackgroundList: 'rgb(255, 255, 255)',
    backgroundListContainer: 'rgb(181, 243, 146)',
    onBackgroundListContainer: 'rgb(7, 33, 0)',
    check: 'rgb(53, 107, 26)',
    onCheck: 'rgb(255, 255, 255)',
    checkContainer: 'rgb(170, 247, 117)',
    onCheckContainer: 'rgb(10, 32, 0)',
    textColor: 'rgb(0,0,0)',
  },
}

const darkColors = {
  colors: {
    primary: 'rgb(32,130,232)',
    onPrimary: 'rgb(0, 49, 95)',
    primaryContainer: 'rgb(0, 71, 134)',
    onPrimaryContainer: 'rgb(212, 227, 255)',
    secondary: 'rgb(188, 199, 220)',
    onSecondary: 'rgb(39, 49, 65)',
    secondaryContainer: 'rgb(61, 71, 88)',
    onSecondaryContainer: 'rgb(216, 227, 248)',
    tertiary: 'rgb(218, 189, 226)',
    onTertiary: 'rgb(61, 40, 70)',
    tertiaryContainer: 'rgb(85, 63, 93)',
    onTertiaryContainer: 'rgb(247, 216, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(0, 0, 0)',
    onBackground: 'rgb(227, 226, 230)',
    surface: 'rgb(26, 28, 30)',
    onSurface: 'rgb(227, 226, 230)',
    surfaceVariant: 'rgb(67, 71, 78)',
    onSurfaceVariant: 'rgb(195, 198, 207)',
    outline: 'rgb(141, 145, 153)',
    outlineVariant: 'rgb(67, 71, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 226, 230)',
    inverseOnSurface: 'rgb(47, 48, 51)',
    inversePrimary: 'rgb(0, 95, 175)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(33, 37, 41)',
      level2: 'rgb(37, 42, 48)',
      level3: 'rgb(41, 47, 55)',
      level4: 'rgb(43, 49, 57)',
      level5: 'rgb(46, 52, 62)',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(45, 49, 56, 0.4)',
    backgroundList: 'rgb(53, 107, 26)',
    onBackgroundList: 'rgb(17, 56, 0)',
    backgroundListContainer: 'rgb(29, 82, 1)',
    onBackgroundListContainer: 'rgb(181, 243, 146)',
    check: 'rgb(129,202,78)',
    onCheck: 'rgb(23, 56, 0)',
    checkContainer: 'rgb(36, 81, 0)',
    onCheckContainer: 'rgb(170, 247, 117)',
    textColor: 'rgb(255,255,255)',
  },
}

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

  return (
    <SafeAreaProvider>
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
              <SafeAreaView style={{ flex: 1 }}>
                <FlashMessage position="top" style={{ marginTop: 50 }} />
                {children}
              </SafeAreaView>
            </ThemeContext.Provider>
          </PaperProvider>
        </ThemeProvider>
      </LoadingContextProvider>
    </SafeAreaProvider>
  )
}
