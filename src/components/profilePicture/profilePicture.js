import React from 'react'
import { Image, View } from 'react-native';
import noProfilePic from '../../../assets/noProfilePic.png'

export const ProfilePicture = ({imageUri}) => {
  return(
    <View style={{ width: 150, height: 150 }} >
      <Image style= {{flex:1 , borderRadius: 75, width: '100%' }}
             source={imageUri ? {uri : imageUri} : noProfilePic}
      />
    </View>
  )
}
