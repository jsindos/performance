import { createProfiledBottomTabNavigator } from '@shopify/react-native-performance-navigation-bottom-tabs'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { ReactNavigationPerformanceView } from '@shopify/react-native-performance-navigation'
import React, { useContext } from 'react'

import GlobalContext from './Global.context'
import { BuyingBottomTabParamList, NavigationKeys, RootStackParamList } from './constants'
import ExploreIcon from './pop-components/ExploreIcon'
import Explore from './Explore'
import ProductDetailFixedMenu from './ProductDetailFixedMenu'

const Stack = createNativeStackNavigator<RootStackParamList>()

const { Tab, buildProfiledBottomTabBarButton } = createProfiledBottomTabNavigator<BuyingBottomTabParamList>()

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NavigationKeys.BUYING}
      >
        <Stack.Screen
          name={NavigationKeys.BUYING}
          // eslint-disable-next-line
          children={() => {
            return <BuyingNavigator />
          }}
        />
        <Stack.Screen name={NavigationKeys.PRODUCT_DETAIL} component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const ProductDetail = () => {
  return (
    <ProductDetailFixedMenu>
      <Text>
        Hello
      </Text>
    </ProductDetailFixedMenu>
  )
}

const TabItem = ({ color, focused, route, Icon }) => (
  <View style={{ alignItems: 'center' }}>
    <Icon color={color} height={20} />
    <Text agrandir style={{ color: focused ? color : '#fff', marginTop: 2 }} bold>
      {route.name.toUpperCase()}
    </Text>
  </View>
)

const BuyingNavigator = () => {
  const { IS_TESTING_PERFORMANCE } = useContext(GlobalContext)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // tabBarActiveTintColor: theme.colors.active,
        tabBarInactiveTintColor: '#BFE4F9',
        tabBarActiveBackgroundColor: '#000',
        tabBarInactiveBackgroundColor: '#000',
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused }) => {
          switch (route.name) {
            case 'Explore':
              return <TabItem {...{ color, focused, route }} Icon={ExploreIcon} />
            default:
              return <Text agrandir bold style={{ color: focused ? color : '#fff', fontSize: 9 }}>{route.name.toUpperCase()}</Text>
          }
        }
      })}
    >
      <Tab.Screen
        name={NavigationKeys.EXPLORE}
        component={Explore}
        options={{
          // @ts-ignore
          tabBarButton: buildProfiledBottomTabBarButton(),
          unmountOnBlur: IS_TESTING_PERFORMANCE
        }}
      />
      <Tab.Screen
        name={NavigationKeys.BAG}
        component={Bag}
        options={{
          // @ts-ignore
          tabBarButton: buildProfiledBottomTabBarButton(),
          unmountOnBlur: IS_TESTING_PERFORMANCE
        }}
      />
    </Tab.Navigator>
  )
}

const Bag = () => {
  return (
    <ReactNavigationPerformanceView
      screenName={NavigationKeys.BAG}
      interactive
    >
      <View />
    </ReactNavigationPerformanceView>
  )
}
