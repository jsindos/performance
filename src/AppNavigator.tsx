import { createProfiledBottomTabNavigator } from '@shopify/react-native-performance-navigation-bottom-tabs'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NavigationKeys, RootStackParamList } from './constants'
import ExploreIcon from './pop-components/ExploreIcon'
import Explore from './Explore'
import ProductDetailFixedMenu from './ProductDetailFixedMenu'
import { NavigationContainer } from '@react-navigation/native'
import { ReactNavigationPerformanceView } from '@shopify/react-native-performance-navigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

type ValueOf<T> = T[keyof T];

type Props = {
  [key in ValueOf<Pick<typeof NavigationKeys, 'EXPLORE'>>]: undefined;
};

const { Tab, buildProfiledBottomTabBarButton } = createProfiledBottomTabNavigator<Props>()

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NavigationKeys.BUYING}
      >
        <Stack.Screen
          name={NavigationKeys.BUYING}
        // eslint-disable-next-line
        children={props => {
          return <BuyingNavigator {...props} />
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
        tabBarIcon: ({ color, focused, size }) => {
          switch (route.name) {
            case 'Explore':
              return <TabItem {...{ color, focused, route }} Icon={ExploreIcon} />
          }
        }
      })}
    >
      <Tab.Screen
        name={NavigationKeys.EXPLORE}
        component={Explore}
        options={{
          tabBarButton: buildProfiledBottomTabBarButton()
        }}
      />
    </Tab.Navigator>
  )
}
