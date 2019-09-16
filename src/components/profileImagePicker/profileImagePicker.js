import * as React from 'react';
import {
  Button,
  Image,
  View,
  SafeAreaView,
  YellowBox,
  Dimensions,
  BackHandler,
  ToastAndroid,
  TouchableOpacity,
  Modal
} from 'react-native';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';
import LoadingScreen from '../loadingScreen';
import globalStyles from '../../styles/global';
import { Ionicons } from '@expo/vector-icons';


const DESIRED_RATIO = "16:9";
const IMAGE_QUALITY = 0.5;

//todo:remove this
YellowBox.ignoreWarnings(['Setting a timer']);

export default class ProfileImagePicker extends React.Component {
  state = {
    image: null,
    screenWidth: Dimensions.get('window').width
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  prepareCameraRatio = async () => {
    if (Constants.platform.android && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      this.setState({ ratio });
    }
  }

  pickImageFromLibrary = async () => {

    this.setState({loading: true});

    // if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({hasCameraLibraryPermission: true});
    }else{
      this.setState({hasCameraLibraryPermission: false, loading: false});
      return;
    }
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: IMAGE_QUALITY
    });

    if(result.cancelled){
      this.setState({ loading: false });
    }

    else if (!result.cancelled) {
      this.setState({ image: result.uri, showPic: true, loading: false });
    }
  };

  takePicture = async () => {

    let result = await this.camera.takePictureAsync({
      skipProcessing: true,
      quality: IMAGE_QUALITY
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri, showPic: true });
    }
  };

  savePicture = () => {
    this.props.savePicture(this.state.image);
  }

  render() {
    let { image, showPic, loading, screenWidth, hasCameraLibraryPermission } = this.state;
    let { hideProfileImagePicker } = this.props;
    let pictureWidth = screenWidth - 20;
    let pictureBorderRadius = Math.floor(pictureWidth/2);

    if(loading) return <LoadingScreen/>;

    if(showPic){
      return(
        <Modal>
          <View style={globalStyles.page}>

            <TouchableOpacity
              onPress={hideProfileImagePicker}
              style={{
                position: 'absolute',
                top: Constants.statusBarHeight,
                right: 10,
              }}>
              <Ionicons name="md-close" size={32} color="red" />
            </TouchableOpacity>

            <View style={{ width: pictureWidth, height: pictureWidth }} >
              <Image style= {{flex:1 , borderRadius: pictureBorderRadius }}
                     source={{ uri: image }}
              />
            </View>
            <Button
              title="Change image"
              onPress={() => this.setState({showPic: false})}
            />
            <Button
              title="Done"
              onPress={this.savePicture}
            />
          </View>
        </Modal>
      )
    }

    return (
      <Modal>
        <View style={globalStyles.page}>
          <Camera
            ref={ ref => this.camera = ref }
            style={{ flex: 1, width: '100%' }}
            type={Camera.Constants.Type.front}
            onCameraReady={this.prepareCameraRatio}
            ratio={this.state.ratio}>
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative'
              }}>

              <TouchableOpacity
                onPress={hideProfileImagePicker}
                style={{
                  position: 'absolute',
                  top: Constants.statusBarHeight,
                  right: 10,
                }}>
                <Ionicons name="md-close" size={32} color="red" />
              </TouchableOpacity>

              <View style={{
                height: pictureWidth,
                width:pictureWidth,
                borderColor: 'white',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: pictureBorderRadius
              }}/>
              <View style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: 'white',
                bottom: 0,
                left: 0
              }}>
                <Button
                  title="Take picture"
                  onPress={this.takePicture}
                />
                <Button
                  title={`${(hasCameraLibraryPermission === false) ? 'Permission needed to use image from Gallery' : 'Pick an image from camera roll'}`}
                  onPress={this.pickImageFromLibrary}
                  disabled={hasCameraLibraryPermission === false}
                />
              </View>
            </View>
          </Camera>
        </View>
      </Modal>
    )

  }
}
