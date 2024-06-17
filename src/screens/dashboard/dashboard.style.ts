import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../resources/theme';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.white,
    minHeight: theme.completeScreenHeight * 0.99,
    padding: theme.screenWidth * 0.025,
    paddingTop: theme.screenHeight * 0.02,
  },
  header: {},
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notification: {
    width: 40,
    height: 40,
  },
  apply: {
    width: 40,
    height: 40,
    // position: 'absolute'
  },
  transcript: {
    width: 40,
    height: 50,
    position: 'absolute',
  },
  applyContainer: {
    marginTop: 20,
    width: theme.screenWidth * 0.42,
    height: theme.screenHeight * 0.55,
    backgroundColor: theme.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transContainer: {
    width: theme.screenWidth * 0.415,
    height: theme.screenHeight * 0.25,
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  categoryList: {
    paddingVertical: 16,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategory: {
    backgroundColor: '#ddd',
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productList: {
    paddingVertical: 16,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: width / 2 - 32,
    height: width / 2 - 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default styles;
