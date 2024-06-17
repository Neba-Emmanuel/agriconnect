import {StyleSheet, Platform} from 'react-native';
import theme from '../../resources/theme';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  reviewsContainer: {
    marginTop: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  review: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: theme.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 14,
  },
  cartButton: {
    width:
      Platform.OS === 'ios'
        ? theme.screenWidth * 0.43
        : theme.screenWidth * 0.47,
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 2},
    marginTop: 16,
    bottom: 16,
  },
  cartButtonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: 'bold',
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
