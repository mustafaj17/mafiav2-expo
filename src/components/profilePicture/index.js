import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Image, View } from 'react-native';
import noProfilePic from '../../../assets/noProfilePic.png';
import * as PropTypes from 'prop-types';

const ProfilePicture = ({ imageUri, size, loadingPhoto }) => {
  const borderRadius = Math.floor(size / 2);

  if (loadingPhoto)
    return (
      <View
        style={{
          width: size,
          height: size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#e2e2e2',
          borderRadius: Math.floor(size / 2),
        }}>
        <ActivityIndicator size={0} color="#28F1A6" />
      </View>
    );

  return (
    <View
      style={{
        width: size,
        height: size,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: Math.floor(size / 2),
      }}>
      <Image
        style={{ flex: 1, borderRadius: borderRadius, width: '100%' }}
        source={imageUri ? { uri: imageUri } : noProfilePic}
      />
    </View>
  );
};

ProfilePicture.propTypes = {
  size: PropTypes.number,
  imageUri: PropTypes.string,
};

ProfilePicture.defaultProps = {
  size: 150,
};

const mapStateToProps = state => ({
  loadingPhoto: state.user.loadingPhoto,
});

export default connect(mapStateToProps)(ProfilePicture);
