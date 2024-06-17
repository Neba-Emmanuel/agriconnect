/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './productScreen.style';
import {Icons} from '../../components';
import {IconType} from '../../components/icon/icons.component';
import theme from '../../resources/theme';
import {useCart} from '../cartScreen/cartContext';

const ProductDetailScreen = ({navigation, route}: any) => {
  const {product} = route.params;
  const [heart, setHeart] = useState(true);
  const {addToCart, cartItemCount} = useCart();

  const toggleHeart = () => {
    setHeart(prevHeart => !prevHeart);
  };

  interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.head}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons size={30} icon={IconType.BACK} color={theme.primary} />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: theme.screenHeight * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
              // left: theme.screenWidth * 0.03,
            }}
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 10}} onPress={toggleHeart}>
              <Icons
                size={30}
                icon={heart ? IconType.HEART : IconType.HEART_RED}
                color={theme.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
              <Icons
                size={30}
                icon={IconType.SHOPPING_CART}
                color={theme.primary}
              />
              {cartItemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Image source={product.image} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price.toFixed(2)} FCFA</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews:</Text>
          {product.reviews.map((review: Review) => (
            <View key={review.id} style={styles.review}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => addToCart(product)}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
