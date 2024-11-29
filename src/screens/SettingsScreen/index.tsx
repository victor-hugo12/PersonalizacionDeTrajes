import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { CustomAppBar } from '@/components/CustomAppBar'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { LanguageType } from '@/constants/configurations'
import { useLanguage } from '@/context/LanguageContext'
import { ThemeType, useTheme } from '@/context/ThemeContext'
import i18n from '@/language'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

const SYSTEM = 'System'

const themeTypeMap = {
  dark: 'Dark',
  light: 'Light',
}

const themeOptions = [
  { value: 'System', icon: 'theme-light-dark' },
  { value: 'Dark', icon: 'weather-night' },
  { value: 'Light', icon: 'weather-sunny' },
]

const languageOptions = [
  { value: 'English', icon: 'earth' },
  { value: 'Spanish', icon: 'flag' },
]

export const SettingsScreen = () => {
  const { themeType, setThemeType, isSystemTheme, setIsSystemTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [themeSelected, setThemeSelected] = useState<string>(isSystemTheme ? SYSTEM : themeTypeMap[themeType])
  const [languageSelected, setLanguageSelected] = useState<string>(language)

  const handleTheme = (value: string) => {
    if (value === SYSTEM) {
      setIsSystemTheme(true)
    } else {
      setIsSystemTheme(false)
      setThemeType(value.toLowerCase() as ThemeType)
    }
    setThemeSelected(value)
  }

  const handleLanguage = (value: string) => {
    setLanguage(value as LanguageType)
    setLanguageSelected(value)
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={'Settings'} />
      <View style={styles.body}>
        <View style={styles.option}>
          <Text variant="titleMedium">{i18n.t('Theme')}</Text>
          <SelectionGroupButton options={themeOptions} selected={themeSelected} onSelect={handleTheme} />
        </View>
        <View style={styles.option}>
          <Text variant="titleMedium">{i18n.t('Language')}</Text>
          <SelectionGroupButton options={languageOptions} selected={languageSelected} onSelect={handleLanguage} />
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 25,
    flex: 1,
  },
  option: {
    gap: 10,
    paddingBottom: 20,
  },
})
