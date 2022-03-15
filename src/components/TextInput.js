import React, {useState} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Input} from '@ui-kitten/components';
import Fonts from '../assets/Font';
import Themes from '../assets/Theme';

const TextInput = React.forwardRef((props, ref) => {
  let [focus, setfocus] = useState(props.value != '');
  let [colorChange, setcolorChange] = useState(false);

  const onFocus = () => {
    setcolorChange(true);
    setfocus(true);
  };
  const onBlur = () => {
    if (props.value !== '') {
      setcolorChange(false);
      setfocus(true);
    } else {
      setfocus(false);
    }
  };
  return (
    <View style={Styles.container}>
      {focus ? (
        <View style={Styles.text}>
          {colorChange ? (
            <Text style={Fonts.nav_small_active_bold}>{props.sub_place}</Text>
          ) : (
            <Text style={Fonts.caption_bold_alert_small}>
              {props.sub_place}
            </Text>
          )}
        </View>
      ) : (
        <Text style={Fonts.nav_small_active_bold}></Text>
      )}
      <Input
        style={[
          Styles.input,
          {
            borderColor: focus
              ? Themes.linear_gradient_start
              : Themes.border_primary,
          },
        ]}
        placeholderTextColor={Themes.text_placeholder}
        textStyle={Fonts.body_normal_medium}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        ref={ref}
        underlineColor="transparent"
        onChangeText={props.onChangeText}
        // underlineColorAndroid={theme.Background_Primary}
        placeholder={
          Platform.OS === 'ios' ? ' ' + props.placeholder : props.placeholder
        }
        value={props.value}
        {...props}
      />

      {focus ? (
        <>
          {colorChange ? (
            <View style={Styles.blue_line} />
          ) : (
            <View style={Styles.line} />
          )}
        </>
      ) : (
        <View style={Styles.line} />
      )}
    </View>
  );
});

export default TextInput;

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    paddingVertical: 4,
    marginBottom: 20,
  },
  text: {
    marginLeft: 8,
  },
  input: {
    backgroundColor: Themes.background_primary,
    width: '100%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    left: -12,
  },
  blue_line: {
    width: ' 100%',
    borderBottomColor: Themes.nav_active,
    borderBottomWidth: 1,
  },
  line: {
    width: ' 100%',
    borderBottomColor: Themes.border_primary,
    borderBottomWidth: 1,
  },
});
