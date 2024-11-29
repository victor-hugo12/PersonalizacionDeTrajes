import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'

import { EN } from '@/constants/configurations'

import en from './en.json'
import es from './es.json'

const i18n = new I18n({
  ...en,
  ...es,
})

i18n.defaultLocale = EN
i18n.locale = getLocales()[0].languageCode ?? EN
i18n.enableFallback = true

export default i18n
