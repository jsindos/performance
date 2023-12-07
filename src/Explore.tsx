import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationKeys, RootStackParamList } from './constants'
import {
  ReactNavigationPerformanceView,
  useProfiledNavigation
} from '@shopify/react-native-performance-navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export default () => {
  const { navigate } = useProfiledNavigation<NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>>()

  return (
    <ReactNavigationPerformanceView
      screenName={NavigationKeys.EXPLORE}
      interactive
    >
      <TouchableOpacity
        onPressIn={uiEvent => {
          navigate(
            {
              source: NavigationKeys.EXPLORE,
              uiEvent
            },
            NavigationKeys.PRODUCT_DETAIL
          )
        }}
        style={{ padding: 10, backgroundColor: '#000', borderRadius: 5 }}
      >
        <Text>
          Hi
        </Text>
      </TouchableOpacity>
    </ReactNavigationPerformanceView>
  )
}
