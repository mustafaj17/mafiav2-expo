import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    marginBottom: 10,
  },
  player: {
    display: 'flex',
    flex: 1,
    minHeight: 60,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default styles;
