import { NavigatorScreenParams } from '@react-navigation/native'

export const NavigationKeys = {
  BUYING: 'Buying' as const,
  EXPLORE: 'Explore' as const,
  BAG: 'Bag' as const,
  PRODUCT_DETAIL: 'ProductDetail' as const
}

export type BuyingBottomTabParamList = {
  Explore: undefined,
  Bag: undefined
}

export type RootStackParamList = {
  Buying: NavigatorScreenParams<BuyingBottomTabParamList>,
  ProductDetail: undefined
};
