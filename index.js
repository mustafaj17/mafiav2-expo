import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('com.debugdigital.mafiav2', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('com.debugdigital.mafiav2', { rootTag });
}
