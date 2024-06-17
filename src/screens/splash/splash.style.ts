import {StyleSheet} from 'react-native';
import theme from '../../resources/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  logoWrapper: {
    width: theme.screenWidth * 0.5,
    height: theme.screenHeight,
    marginHorizontal: 'auto',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default styles;
