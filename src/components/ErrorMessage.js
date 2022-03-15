import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Fonts from '../assets/Font';
import Themes from '../assets/Theme';

export default function ErrorMessage(props) {
  return (
    <View style={Styles.container}>
      <View style={Styles.row}>
        <Image
          source={require('../assets/images/Error.png')}
          style={Styles.image}
        />
        <Text style={Fonts.caption_normal_alert}>{props.message}</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',

    borderWidth: 1,
    borderRadius: 4,

    borderColor: Themes.border_error,
    backgroundColor: Themes.background_error,
    justifyContent: 'center',
  },
  cancel: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  image: {
    marginTop: 3,
    height: 16,
    width: 16,
    marginHorizontal: 8,
  },
  row: {
    paddingRight: 25,
    paddingHorizontal: 3,
    paddingVertical: 3,
    flexDirection: 'row',
  },
});
