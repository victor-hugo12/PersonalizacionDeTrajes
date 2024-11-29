import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Appbar, Menu } from 'react-native-paper'

import { useTheme } from '@/context/ThemeContext'
import i18n from '@/language'
import { signOutUser } from '@/services/firebaseAuth'

interface Props {
  title: string
  icon?: string
  backAction?: boolean
}

export const CustomAppBar: React.FC<Props> = ({ title, icon, backAction = true }) => {
  const { isDarkTheme, theme } = useTheme()
  const router = useRouter()

  const [visible, setVisible] = useState(false)

  const handleMore = () => setVisible(true)
  const hideMenu = () => setVisible(false)

  const handleProfile = () => {
    hideMenu()
    console.log('Navigating to Profile')
  }

  const handleLogout = async () => {
    hideMenu()
    await signOutUser()
  }

  return (
    <Appbar.Header
      statusBarHeight={0}
      style={{ backgroundColor: isDarkTheme ? theme.colors.surface : theme.colors.primaryContainer, height: 50 }}
    >
      {backAction && <Appbar.BackAction onPress={() => router.back()} />}
      {icon !== undefined && <Appbar.Action icon={icon} />}
      <Appbar.Content title={i18n.t(title)} />
      <Menu visible={visible} onDismiss={hideMenu} anchor={<Appbar.Action icon="dots-vertical" onPress={handleMore} />}>
        <Menu.Item onPress={handleProfile} title={i18n.t('Profile')} />
        <Menu.Item onPress={handleLogout} title={i18n.t('Logout')} />
      </Menu>
    </Appbar.Header>
  )
}
