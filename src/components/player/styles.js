import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
  container: {
    paddingLeft: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  player: {
    display: 'flex',
    flex: 1,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
});

export default styles;
