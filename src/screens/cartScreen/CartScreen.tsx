/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useCart} from './cartContext';
import {Icons} from '../../components';
import {IconType} from '../../components/icon/icons.component';
import theme from '../../resources/theme';
import styles from './cart.style';

interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

const CartScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {cart, removeFromCart, increaseQuantity, decreaseQuantity} = useCart();

  const getTotalAmount = () => {
    const productTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    return productTotal;
  };

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>
          {(item.price * item.quantity).toFixed(2)} FCFA
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => decreaseQuantity(item.id)}>
            <Icons size={10} icon={IconType.MINUS} color={theme.white} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => increaseQuantity(item.id)}>
            <Icons size={10} icon={IconType.PLUS} color={theme.white} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => removeFromCart(item.id)}>
        <Icons size={10} icon={IconType.CANCEL} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.head}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons size={30} icon={IconType.BACK} color={theme.primary} />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: theme.screenWidth * 0.15,
            }}>
            <Text style={{fontSize: 24}}>Cart</Text>
          </View>
        </View>
      </View>
      {cart.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('CheckoutOptions')}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Text style={styles.checkoutButtonText}>
              {`|      ${getTotalAmount().toFixed(2)} FCFA`}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity>
            <Icons
              size={120}
              icon={IconType.SHOPPING_CART}
              color={theme.primary}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 16, top: 10}}>No Item Added to Cart</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
