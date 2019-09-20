import React from 'react'
import { connect } from 'react-redux';
import {ActivityIndicator, Image, View} from 'react-native';
import noProfilePic from '../../../assets/noProfilePic.png'
import * as PropTypes from 'prop-types';
import Text from '../text';

const ProfilePicture = ({imageUri, size, loadingPhoto}) => {

  const borderRadius = Math.floor(size / 2);

  if(loadingPhoto) return (
    <View style={{ width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator size="large" color="#28F1A6" />
      <Text style={{marginTop: 10}} >Loading image...</Text>
    </View>
  )

  return(
    <View style={{ width: size, height: size }} >
      <Image style= {{flex:1 , borderRadius: borderRadius, width: '100%' }}
             source={imageUri ? {uri : imageUri} : noProfilePic}/>
    </View>
  )
}

ProfilePicture.propTypes = {
  size: PropTypes.number,
  imageUri: PropTypes.string,
}

ProfilePicture.defaultProps = {
  size: 150
}

const mapStateToProps = state => ({
  loadingPhoto: state.user.loadingPhoto
})

export default connect(mapStateToProps)(ProfilePicture);
