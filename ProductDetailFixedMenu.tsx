import React, { useRef } from 'react'
import { Animated, Dimensions, Platform, StyleSheet, TouchableOpacity, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Times from './src/Times'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from './App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// import HeartIcon from './HeartIcon'
// import LeftCaret from '../../assets/icons/LeftCaret'
// import useGoBackWithParams from '../helpers/useGoBackWithParams'

const NAVBAR_HEIGHT = 77
const { width } = Dimensions.get('window')
const IMAGE_HEIGHT = width / 1.5

export default ({ children }: { children: React.ReactNode }) => {
  const yOffset = useRef(new Animated.Value(0)).current
  const { top } = useSafeAreaInsets()

  const headerOpacity = yOffset.interpolate({
    inputRange: [0, IMAGE_HEIGHT - NAVBAR_HEIGHT - 20, IMAGE_HEIGHT - NAVBAR_HEIGHT],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })

  const inverseHeaderOpacity = yOffset.interpolate({
    inputRange: [0, IMAGE_HEIGHT - NAVBAR_HEIGHT - 20, IMAGE_HEIGHT - NAVBAR_HEIGHT],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  })

  const boxShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }

  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
  const navigation = useNavigation<homeScreenProp>()

  //   const goBackWithParams = useGoBackWithParams()

  //   const { currentRoute } = useContext(ProductOptionsContext)

  //   const onPress = () => currentRoute === 'ProductDetailMaker' ? navigation.navigate('Selling', { screen: 'Listings' }) : goBackWithParams({ isBackFromProductDetail: true })

  //   const { setIsLightMode } = useContext(ProductOptionsContext)

  return (
    <>
      <View style={{ position: 'absolute', right: 0, left: 0, paddingBottom: 14, paddingTop: 14 + top, zIndex: 1 }}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: headerOpacity, backgroundColor: '#fff', borderBottomColor: '#efefef', borderBottomWidth: 1 }]}
        />

        <View style={{ height: 32 }}>
          <Animated.View style={[styles.iconContainer, { opacity: inverseHeaderOpacity, ...boxShadow, left: 25 }]} />
          <TouchableOpacity onPressIn={() => navigation.navigate('Home')} style={[styles.iconContainer, { left: 25 }]}>
            <Times />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.ScrollView
        scrollEventThrottle={1}
        style={{ backgroundColor: 'white' }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset
                }
              }
            }
          ],
          {
            useNativeDriver: Platform.OS !== 'web',
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            //   if (event.nativeEvent.contentOffset.y >= (IMAGE_HEIGHT - NAVBAR_HEIGHT)) {
            //     setIsLightMode(false)
            //   } else {
            //     setIsLightMode(true)
            //   }
            }
          }
        )}
      >
        {children}
      </Animated.ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    display: 'flex',
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
