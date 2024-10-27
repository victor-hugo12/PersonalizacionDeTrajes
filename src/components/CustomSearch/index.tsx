import { useState } from 'react'
import { Searchbar } from 'react-native-paper'

const DELAY = 1000

interface CustomSearchProps {
  placeholder: string
  onChange: (value: string) => void
}

export const CustomSearch: React.FC<CustomSearchProps> = ({ placeholder, onChange }) => {
  const [query, setQuery] = useState<string>('')
  const [refTimeout, setRefTimeout] = useState<NodeJS.Timeout | undefined>()

  const handleChange = (value: string) => {
    setQuery(value)
    clearTimeout(refTimeout)

    setRefTimeout(
      setTimeout(() => {
        onChange(value)
      }, DELAY),
    )
  }

  return <Searchbar placeholder={placeholder} onChangeText={handleChange} value={query} theme={{ roundness: 1 }} />
}
