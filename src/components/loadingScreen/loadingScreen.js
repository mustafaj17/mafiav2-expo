import { ActivityIndicator, View } from 'react-native';
import globalStyles from '../../styles/global';

export const LoadingScreen = () => {
  return (
    <View style={globalStyles.page}>
      <ActivityIndicator size="large" />
    </View>
  )
}
