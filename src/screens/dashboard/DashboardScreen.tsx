/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import styles from './dashboard.style';
import Avatar from '../../components/avatar/Avatar';
import theme from '../../resources/theme';
import Icons, {IconType} from '../../components/icon/icons.component';
import {products} from '../../resources/data/products';
import {categories} from '../../resources/data/categories';
import CustomTextInput from '../../components/input/input';
import {useCart} from '../cartScreen/cartContext';
// import { useAppSelector } from '../../redux/typings';
// import { RootState } from '../../redux/store';

type Props = {
  navigation?: any;
};

const DashboardScreen: FC<Props> = ({navigation}) => {
  // const { user } = useAppSelector((state: RootState) => state.authSlice);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchText, setSearchText] = useState('');
  const {cartItemCount} = useCart();

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchText]);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        product => product.category === selectedCategory,
      );
    }

    if (searchText) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchText.toLowerCase()),
        console.log('Search text', searchText),
      );
    }

    setFilteredProducts(filtered);
  };

  const renderCategory = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.name)}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({item}: any) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', {product: item})}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price.toFixed(2)} FCFA</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.head}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Avatar />
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

            <View
              style={
                Platform.OS === 'android'
                  ? {width: 235, left: -theme.screenWidth * 0.008}
                  : {width: 265, left: -theme.screenWidth * 0.005}
              }>
              <CustomTextInput
                placeholder="Search..."
                onChangeText={item => {
                  setSearchText(item);
                }}
                value={searchText}
                icon={
                  <Icons size={20} icon={IconType.SEARCH} color={theme.gray} />
                }
              />
            </View>

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
          {/* <Icons size={30} icon={IconType.NOTIFICATION} color={theme.black} /> */}
        </View>

        {/* <View>
          <Text style={{ marginBottom: -18, marginTop: 20 }}>Categories</Text>
        </View> */}

        <View>
          <FlatList
            ListHeaderComponent={
              <FlatList
                data={[
                  {
                    id: 'all',
                    name: 'All',
                    image: require('../../assets/images/table-birds.webp'),
                  },
                  ...categories,
                ]}
                renderItem={renderCategory}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
              />
            }
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
