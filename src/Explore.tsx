import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ReactNavigationPerformanceView, useProfiledNavigation } from '@shopify/react-native-performance-navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { BuyingBottomTabParamList, NavigationKeys, RootStackParamList } from './constants'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { CompositeNavigationProp } from '@react-navigation/native'

type ExploreScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyingBottomTabParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>

export default () => {
  const { navigate } = useProfiledNavigation<ExploreScreenProp>()

  return (
    <ReactNavigationPerformanceView
      screenName={NavigationKeys.EXPLORE}
      interactive
    >
      <TouchableOpacity
        testID='ProductDetail'
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
