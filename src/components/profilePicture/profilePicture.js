import React from 'react'
import { Image, View } from 'react-native';
import noProfilePic from '../../../assets/noProfilePic.png'

export const ProfilePicture = ({imageUri, size}) => {


  const picSize = size || 150;
  const borderRadius = Math.floor(picSize / 2);

  return(
    <View style={{ width: picSize, height: picSize }} >
      <Image style= {{flex:1 , borderRadius: borderRadius, width: '100%' }}
             source={imageUri ? {uri : imageUri} : noProfilePic}/>
    </View>
  )
}
