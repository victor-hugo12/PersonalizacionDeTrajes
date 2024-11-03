import { Tabs } from 'expo-router'

import { TabBarIcon } from '@/components/TabBarIcon'
import { ACTIVE, IN_ACTIVE } from '@/constants/colors'
import { useTheme } from '@/context/ThemeContext'
import i18n from '@/language'

const TabLayout = () => {
  const { theme } = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: IN_ACTIVE,
      }}
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
        name="example"
        options={{
          title: 'example',
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
    </Tabs>
  )
}

export default TabLayout
