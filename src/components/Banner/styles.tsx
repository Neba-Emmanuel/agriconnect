import {StyleSheet} from 'react-native';

import {PALETTE} from '../../utils/colors';
import {SCREEN} from '../../utils/constant';

const styles = StyleSheet.create({
  child: {width: SCREEN.width, justifyContent: 'center'},
  text2: {fontSize: SCREEN.width * 0.5, textAlign: 'center'},
  house: {
    fontSize: 25,
    fontFamily: 'Quicksand-Medium',
    color: PALETTE.WHITE,
    marginLeft: SCREEN.width * 0.05,
  },
  lorem: {
    fontSize: 14,
    fontFamily: 'Hind-Medium',
    color: PALETTE.WHITE,
    marginLeft: SCREEN.width * 0.05,
  },
  buttonStyle: {
    width: SCREEN.width * 0.25,
    height: SCREEN.height * 0.045,
    backgroundColor: PALETTE.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SCREEN.width * 0.05,
    borderRadius: 7,
    top: 7,
  },
  buttonTextStyle: {
    fontSize: 12,
    fontFamily: 'Hind-Medium',
    color: PALETTE.BLACK,
  },
});
export default styles;
