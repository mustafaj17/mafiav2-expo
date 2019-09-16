import React from 'react'
import { Image, View } from 'react-native';
import noProfilePic from '../../../assets/noProfilePic.png'
import * as PropTypes from 'prop-types';

const ProfilePicture = ({imageUri, size}) => {

  const borderRadius = Math.floor(size / 2);

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

export default ProfilePicture;
