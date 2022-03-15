import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Fonts from '../assets/Font';
import Themes from '../assets/Theme';

export default function Button(props) {
  let dynamicWidth = props.width;

  return (
    <>
      {props.disable ? (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            Styles.diable_btn,
            dynamicWidth != undefined ? {width: dynamicWidth} : {width: '100%'},
          ]}
          disabled={true}>
          <Text style={Fonts.caption_normal_white}>{props.title}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            Styles.btn,
            dynamicWidth != undefined ? {width: dynamicWidth} : {width: '100%'},
          ]}
          disabled={props.disabled}
          {...props}>
          <Text style={Fonts.caption_normal_white}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: Themes.nav_active,
  },
  btn: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: Themes.nav_active,
  },
  diable_btn: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: Themes.nav_disabled,
  },
});
