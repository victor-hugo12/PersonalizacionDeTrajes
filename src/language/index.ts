import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'

import en from './en.json'
import es from './es.json'

const i18n = new I18n({
  ...en,
  ...es,
})

i18n.defaultLocale = 'en'
i18n.locale = getLocales()[0].languageCode ?? 'en'
i18n.enableFallback = true

export default i18n
