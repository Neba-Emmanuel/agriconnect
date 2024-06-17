import {Platform, StyleSheet} from 'react-native';
import theme from '../../resources/theme';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: theme.white,
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
    padding: 20,
    top: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productDetails: {
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  productPrice: {
    fontSize: 16,
  },
  summary: {
    bottom: 130,
    position: 'absolute',
    paddingHorizontal: 20,
  },
  summaryText: {
    fontSize: 18,
    paddingTop: 10,
  },
  whatsappButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  whatsappButtonText: {
    fontSize: 18,
    color: theme.white,
    fontWeight: 'bold',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: '45%',
  },
  paymentButtonText: {
    fontSize: 18,
    color: theme.white,
    fontWeight: 'bold',
  },
  bottomContainer: {
    width:
      Platform.OS === 'ios'
        ? theme.screenWidth * 0.46
        : theme.screenWidth * 0.5,
    padding: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
});

export default styles;
