import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const LoadingContext = createContext({
  loading: false,
  setLoading: (() => {}) as Dispatch<SetStateAction<boolean>>,
})

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingContextProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false)
  const value = { loading, setLoading }
  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Spinner visible={loading} />
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}
