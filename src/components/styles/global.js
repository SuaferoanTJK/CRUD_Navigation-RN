import {StyleSheet} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';

const globalStyles = StyleSheet.create({
  container: {marginHorizontal: 30, marginTop: 25},
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 25,
    fontWeight: '700',
  },
  input: {
    marginBottom: 15,
  },
  btn: {marginTop: 15, padding: 5},
  alertTitle: {
    marginBottom: 1,
    color: DefaultTheme.colors.accent,
    fontWeight: '900',
  },
  content: {paddingBottom: 1},
  actions: {
    paddingBottom: 15,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  newClientBtn: {
    paddingBottom: 10,
    marginHorizontal: 10,
  },
});

export default globalStyles;
