import { Tabs } from 'expo-router'

import { TabBarIcon } from '@/components/TabBarIcon'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import i18n from '@/language'

const TabLayout = () => {
  const { isDarkTheme, theme } = useTheme()
  const { language } = useLanguage()

  return (
    <Tabs
      key={language}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkTheme ? theme.colors.surface : theme.colors.primaryContainer,
        },
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: i18n.t('Home'),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: i18n.t('Orders'),
          tabBarIcon: ({ color }) => <TabBarIcon name="tags" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('Settings'),
          tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fabric"
        options={{
          title: 'fabric',
          href: null,
        }}
      />
      <Tabs.Screen
        name="measurement"
        options={{
          title: 'measurement',
          href: null,
        }}
      />
      <Tabs.Screen
        name="customization"
        options={{
          title: 'customization',
          href: null,
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'summary',
          href: null,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
