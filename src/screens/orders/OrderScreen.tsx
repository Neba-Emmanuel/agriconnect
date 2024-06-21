import React, {FC, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './order.style';
import Avatar from '../../components/avatar/Avatar';
import theme from '../../resources/theme';
import Icons, {IconType} from '../../components/icon/icons.component';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {fetchAllOrders} from '../../redux/slices/orders';
import {useCart} from '../cartScreen/cartContext';

type Props = {
  navigation?: any;
};

const OrderScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {cartItemCount} = useCart();
  const {orders, loading, error} = useSelector(
    (state: RootState) => state.orders,
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
    console.log(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.orderItem}>
      <Text>Order ID: {item._id}</Text>
      {/* <Text>User: {item.user.name}</Text> */}
      <Text>Total Amount: {item.totalAmount} FCFA</Text>
      {item.products.map((product: any, index: number) => (
        <View key={index}>
          {/* <Text>Product: {product.productId?.name}</Text> */}
          {/* <Text>Price: {product.productId?.price} FCFA</Text> */}
          <Text>Quantity: {product.quantity}</Text>
        </View>
      ))}
      <Text>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.head}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Avatar />
            </TouchableOpacity>
            <Text style={styles.headerText}>Orders</Text>
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
        <View style={{paddingBottom: theme.screenHeight * 0.3}}>
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item: {_id: string}) => item._id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
