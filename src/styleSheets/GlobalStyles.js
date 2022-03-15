import {StyleSheet} from 'react-native';
import Themes from '@assets_Theme';

export default StyleSheet.create({
  screen_container: {
    flex: 1,
    backgroundColor: Themes.background_primary,
    height: '100%',
  },
  screen_center: {
    flex: 1,
    justifyContent: 'center',
  },
  close_square: {
    // margin: 10,
    padding: 10,
    // right: -20,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_center: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  column_center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
  text_align: {
    textAlign: 'center',
  },
  success_big_circle: {
    width: 123,
    height: 123,
    borderRadius: 123 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#8E8E8E33',
    marginBottom: 40,
    alignSelf: 'center',
  },
  row_space_between: {
    flexDirection: 'row',
    //alignSelf: 'center',
    justifyContent: 'space-between',
  },
  row_align_end: {
    flexDirection: 'row',
    //alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  align_left: {
    //flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  align_center_start: {
    //flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  align_right: {
    //flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  footer_margin_large: {
    marginBottom: 24,
  },
  footer_margin_20: {
    marginBottom: 20,
  },
  footer_margin_10: {
    marginBottom: 10,
  },
  footer_margin_medium: {
    marginBottom: 16,
  },
  footer_margin_small: {
    marginBottom: 8,
  },
  footer_margin_x_small: {
    marginBottom: 4,
  },
  header_margin_large: {
    marginTop: 24,
  },
  header_margin_medium: {
    marginTop: 16,
  },
  header_margin_small: {
    marginTop: 8,
  },
  header_margin_x_small: {
    marginTop: 4,
  },
  left_margin_large: {
    paddingLeft: 24,
  },
  left_margin_medium: {
    paddingLeft: 16,
  },
  left_margin_small: {
    paddingLeft: 8,
  },
  left_margin_x_small: {
    paddingLeft: 2,
  },
});
