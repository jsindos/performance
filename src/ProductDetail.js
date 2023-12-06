import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Stars from '../../../components/Stars'
import ImageCarousel from './ImageCarousel'
import { S } from 'pop-components'
import { fragments as ProductDetailFragments } from '../fragments'
import ProductDetailFixedMenu from '../../../components/ProductDetailFixedMenu'
import ProfilePicture from '../../../pop-components/src/components/ProfilePicture'
import AddToBagBar from './AddToBagBar'
import PopClassifiedsBar from './PopClassifiedsBar'
import { ClassifiedsBadge, LocationBadge, SingleItemBadge } from '../../../pop-components/src/components/Video/FeedContent'

const { width } = Dimensions.get('window')

export const FULL_PRODUCT = gql`
  query Product($id: Int!) {
    product(id: $id) {
      tags {
        id
        name
      }

      isGumtree
      phoneNumber
      address {
        secondaryText
      }

      ...CoreProductFields
      ...ProductOptions

      sendleOrder {
        id
        createdAt
      }

      seller {
        username
        createdAt
        image {
          id
          uri
          translateX
          translateY
          scale
          shape
        }
      }
    }
  }

  fragment CoreProductFields on Product {
    id
    name
    price
    costPrice
    optionSetName
    deletedAt
    isPublished
    isInventoryManaged
    isEnabledSizes
    coverPhoto
    lowestPrice
    rating
    ratingCount
    createdAt
    description
    isGumtree
    isLiked
    cachedAddress {
      secondaryText
    }

    deletedAt

    isSendEmailWhenSoldOut
    index
  }

  fragment ProductOptions on Product {
    id
    options {
      id
      images
      name
      inventory
      price
      price
    }
  }
`

const ProductDetail = ({ navigation, route }) => {
  const { id: productId, hasConfirmedSafetyPrecautions } = route.params

  const { data: { product }, loading } = useQuery(FULL_PRODUCT, { variables: { id: productId }, returnPartialData: true, notifyOnNetworkStatusChange: true })

  const [isPhoneHidden, setIsPhoneHidden] = useState(true)

  useEffect(() => {
    if (hasConfirmedSafetyPrecautions) setIsPhoneHidden(false)
  }, [hasConfirmedSafetyPrecautions])

  const { bottom } = useSafeAreaInsets()

  if (loading && (!product || Object.keys(product).length === 0)) return <Text>loading</Text>

  const getPrice = product => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'baseline'
      }}
      >
        {product.isEnabledSizes ? <S.Text14>From </S.Text14> : <></>}
        <S.Text18 bold>
          {`$${product.lowestPrice}`}
        </S.Text18>
      </View>
    )
  }

  const hasNoInventory = product?.options?.reduce((a, c) => c.inventory + a, 0) === 0

  return (
    <>
      <ProductDetailFixedMenu {...{ product }}>
        <ImageCarousel product={product} />
        <S.Section withPaddingHorizontal style={{ paddingTop: 20 }}>
          <S.Text24 bold>
            {product.name}
          </S.Text24>
          {
            !product.isInventoryManaged
              ? (
                  product.sendleOrder
                    ? (
                      <S.Text20 style={{ color: '#555', marginTop: 15 }}>
                        Sold
                      </S.Text20>
                      )
                    : (
                      <View
                        style={{
                          maxWidth: width,
                          flexWrap: 'wrap',
                          flexDirection: 'row'
                        }}
                      >
                        <SingleItemBadge inverted style={{ backgroundColor: '#efefef' }} />
                        {
                          product.isGumtree
                            ? <ClassifiedsBadge inverted style={{ backgroundColor: '#efefef', maxWidth: width, marginLeft: 5 }} />
                            : <></>
                        }
                        {
                          product.isGumtree && product.address
                            ? <LocationBadge inverted address={product.address} style={{ backgroundColor: '#efefef', maxWidth: width, marginLeft: 5 }} />
                            : <></>
                        }
                      </View>
                      )

            // <S.Text14 style={{ color: '#777', marginTop: 10 }}>Single item</S.Text14>
                )
              : (
                  hasNoInventory
                    ? (
                      <S.Text16 style={{ color: '#555', marginTop: 15 }}>
                        Sold out
                      </S.Text16>
                      )
                    : <Stars style={{ marginTop: 10 }} rating={product.rating} />
                )
          }
          <View style={{ marginTop: 15 }}>
            {getPrice(product)}
          </View>
          <S.Line withMargin />
          {
            product.description
              ? (
                <>
                  <S.Text16>
                    {product.description}
                  </S.Text16>
                  <S.Line withMargin />
                </>
                )
              : <></>
          }
          {/* <ProductVideos product={product} /> */}
          <SellerInformation {...product?.seller} />
          <S.Line withMargin />
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Feather name='flag' color='#999' size={16} />
            <S.Text14
              style={{ textDecorationLine: 'underline', marginLeft: 10 }}
              onPress={() => navigation.navigate('Modal', { screen: 'Report', params: { id: productId, type: 'listing' } })}
            >
              Report this listing
            </S.Text14>
          </View>
        </S.Section>
        <View style={{ height: 77 + bottom }} />
      </ProductDetailFixedMenu>
      {
        (product.deletedAt || !product.isPublished) && !loading
          ? (
            <View style={[styles.container, { bottom: bottom + 77 + 30 }]} pointerEvents='none'>
              <S.Text12 bold style={{ color: '#fff' }}>
                It looks like this product is no longer available.
              </S.Text12>
            </View>
            )
          : <></>
      }
      <View style={{ position: 'absolute', bottom: 0, width, backgroundColor: '#fff', paddingHorizontal: 25, minHeight: 77 + bottom }}>
        <S.Line style={{ height: 2, position: 'relative', width, left: -25 }} />
        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 55
        }}
        >
          {
          product.isGumtree
            ? (
              <PopClassifiedsBar {...{ isPhoneHidden, product }} />
              )
            : (
              <AddToBagBar product={product} />
              )
          }
        </View>
      </View>
    </>
  )
}

const SellerInformation = seller => {
  const navigation = useNavigation()

  const currDate = new Date(seller.createdAt)

  const dateString = currDate.toDateString().split(' ')

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Profile', { username: seller.username })}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 50
      }}
    >
      <View style={{ flex: 1, marginRight: 20 }}>
        <S.Text20 bold style={{ marginBottom: 20 }}>
          Sold by {seller.username}
        </S.Text20>
        <S.Text14 style={{ color: '#777' }}>
          Joined in {dateString[1] + ' ' + dateString[3]}
        </S.Text14>
      </View>
      <ProfilePicture {...seller.image} height={64} />
    </TouchableOpacity>
  )
}

// const ProductVideos = ({ product }) => {
//   const { data: { product: { videos } } = { product: { videos: [] } }, loading } = useQuery(queries.ProductWithVideos, { variables: { id: product.id } })

//   if (videos.length === 0) return <></>

//   return (
//     <>
//       <S.Text20 bold style={{ marginBottom: videos.length ? 30 : 0 }}>
//         Videos
//       </S.Text20>
//       {
//         loading
//           ? <ActivityIndicator />
//           : <Gallery items={videos.slice(0, 6)} style={{ width, left: -25 }} feedType='single' />
//       }
//       <S.Line withMargin />
//     </>
//   )
// }

ProductDetail.fragments = ProductDetailFragments

export default ProductDetail

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    right: -12,
    top: -4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: '#fff'
  },
  container: {
    // @ts-ignore
    position: Platform.select({ default: 'absolute', web: 'fixed' }),
    width: Dimensions.get('window').width - 50,
    zIndex: 2,
    alignItems: 'center',
    left: 25,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 1.0)',
    borderRadius: 5
  }
})
