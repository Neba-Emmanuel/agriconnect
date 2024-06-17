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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
  },
  optionButtonText: {
    fontSize: 18,
    color: theme.white,
    fontWeight: 'bold',
  },
});

export default styles;
