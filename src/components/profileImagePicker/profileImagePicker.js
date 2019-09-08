import * as React from 'react';
import {
  Button,
  Image,
  View,
  YellowBox,
  Text,
  Dimensions,
  BackHandler,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';

const DESIRED_RATIO = "16:9";
const IMAGE_QUALITY = 0.5;
YellowBox.ignoreWarnings(['Setting a timer']);

export default class ProfileImagePicker extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    hasCameraLibraryPermission: null,
    screenWidth: Dimensions.get('window').width
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    //todo: handle permission rejection
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
      console.log('pop');
      const ratios = await this.camera.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      this.setState({ ratio });
    }
  }

  pickImageFromLibrary = async () => {

    this.setState({loading: true});

    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        this.setState({hasCameraLibraryPermission: false, loading: false});
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: IMAGE_QUALITY
    });

    console.log(result);

    if(result.cancelled){
      this.setState({ loading: false });
    }

    else if (!result.cancelled) {
      this.setState({ image: result.uri, showPic: true, loading: false });
    }
  };

  _takePicture = async () => {

    let result = await this.camera.takePictureAsync({
      quality: IMAGE_QUALITY
    })
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, showPic: true });
    }
  };

  savePicture = () => {
    this.props.savePicture(this.state.image);
  }

  render() {
    let { image, showPic, loading, screenWidth } = this.state;
    let { hideProfileImagePicker } = this.props;
    let pictureWidth = screenWidth - 20;
    let pictureBorderRadius = Math.floor(pictureWidth/2)

    if(loading){
      return(
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if(showPic){
      return(
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity
            onPress={hideProfileImagePicker}
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              top: Constants.statusBarHeight,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{
              fontSize: 36,
              color: 'black'
            }}>X</Text>
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
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ ref => this.camera = ref }
          style={{ flex: 1 }}
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
                width: 50,
                height: 50,
                top: Constants.statusBarHeight,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{
                fontSize: 36,
                color: 'white'
              }}>X</Text>
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
                onPress={this._takePicture}
              />
              <Button
                title="Pick an image from camera roll"
                onPress={this.pickImageFromLibrary}
              />
            </View>
          </View>
        </Camera>
      </View>
    )

  }
}
