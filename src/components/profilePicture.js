import React from 'react'
import { Image, View } from 'react-native';

export const ProfilePicture = ({imageUri}) => {

  if(!imageUri) return null;
  return(
    <View style={{ width: 150, height: 150 }} >
      <Image style= {{flex:1 , borderRadius: 75 }}
             source={{ uri: imageUri }}
      />
    </View>
  )
}
