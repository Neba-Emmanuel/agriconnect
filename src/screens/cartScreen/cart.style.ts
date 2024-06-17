import {Platform, StyleSheet} from 'react-native';
import theme from '../../resources/theme';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 25,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === 'ios'
        ? theme.screenHeight * 0.043
        : theme.screenHeight * 0.01,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  cartItemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
    paddingTop: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#888',
    top: 10,
  },
  checkoutButton: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.screenHeight * 0.01,
    right: -10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: theme.screenWidth * 0.01,
  },
  quantityBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  delete: {
    marginTop: 10,
    marginRight: 10,
  },
});

export default styles;
