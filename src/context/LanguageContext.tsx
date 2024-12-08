import { createContext, ReactNode, useContext, useState } from 'react'

import { LanguageType } from '@/constants/configurations'
import i18n from '@/language'

const languageTypeMap = {
  English: 'en',
  Spanish: 'es',
}

export interface LanguageContextValue {
  language: LanguageType
  setLanguage: (language: LanguageType) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: LanguageType.SPANISH,
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

export interface LanguageContextProviderProps {
  children: ReactNode
}

export const LanguageContextProvider = ({ children }: LanguageContextProviderProps) => {
  const [language, setLanguage] = useState<LanguageType>(LanguageType.SPANISH)

  const changeSelectedLanguage = (value: LanguageType) => {
    i18n.locale = languageTypeMap[value]
    setLanguage(value)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
