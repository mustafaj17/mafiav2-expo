import firebase from '../../services/firebase';

export const uriToBlob = (uri) => {

  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };

    // this helps us get a blob
    xhr.responseType = 'blob';

    xhr.open('GET', uri, true);
    xhr.send(null);

  });

}

export const uploadProfilePictureToFirebase = (blob, userUid) => {

  return new Promise((resolve, reject)=>{

    var storageRef = firebase.storage().ref();

    storageRef.child(`/profilePics/${userUid}.jpg`).put(blob, {
      contentType: 'image/jpeg'
    }).then((snapshot)=>{

      blob.close();

      //return the url of the uploaded file because that all we need
      resolve(snapshot.ref.getDownloadURL());

    }).catch((error)=>{

      reject(error);

    });

  });


}

