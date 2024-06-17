import React from 'react';
import {View, ImageBackground} from 'react-native';
import Carousel from 'react-native-banner-carousel-updated';

import styles from './styles';
import {SCREEN} from '../../utils/constant';
import TextView from '../TextView';
import ButtonView from '../Button';
import {useTranslation} from 'react-i18next';

interface Props {
  onPress: (index: number) => void;
}

const Banner = (props: Props) => {
  let arr = [
    {image: '../../assets/png/banner.png', index: 0},
    {image: '../../assets/png/collection.png', index: 1},
    {image: '../../assets/png/sofa.png', index: 2},
  ];

  const {t} = useTranslation();

  const onSign = (index: number) => {
    props.onPress(index);
  };

  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={SCREEN.width * 0.9}
      showsPageIndicator={true}
      pageIndicatorContainerStyle={{top: SCREEN.height * 0.36}}
      activePageIndicatorStyle={{backgroundColor: '#000', width: 30, height: 6}}
      pageIndicatorOffset={40}
      pageIndicatorStyle={{backgroundColor: '#DCDCDC', width: 30, height: 6}}>
      {arr.map(item => {
        return (
          <View key={item.index}>
            <ImageBackground
              source={
                item.index === 0
                  ? require('../../assets/png/banner.png')
                  : item.index === 1
                  ? require('../../assets/png/collection.png')
                  : require('../../assets/png/sofa.png')
              }
              style={{width: SCREEN.width * 0.9, height: SCREEN.height * 0.35}}
              imageStyle={{borderRadius: 10}}>
              <View style={{marginTop: SCREEN.height * 0.1, width: '80%'}}>
                {item.index === 0 ? (
                  <>
                    <TextView name={t('SHOP_WHOLESALE')} style={styles.house} />
                    <TextView
                      name={t('SHOP_WHOLESALE_SUB')}
                      style={styles.lorem}
                    />
                  </>
                ) : item.index === 1 ? (
                  <>
                    <TextView
                      name={t('SHOP_ACCESSORIES')}
                      style={styles.house}
                    />
                    <TextView
                      name={t('SHOP_ACCESSORIES_SUB')}
                      style={styles.lorem}
                    />
                  </>
                ) : (
                  <>
                    <TextView name={t('SHOP_HOUSEHOLD')} style={styles.house} />
                    <TextView
                      name={t('SHOP_HOUSEHOLD_SUB')}
                      style={styles.lorem}
                    />
                  </>
                )}

                <ButtonView
                  name={t('SHOP_NOW')}
                  onValue={() => onSign(item.index)}
                  style={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                />
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </Carousel>
  );
};
export default Banner;
