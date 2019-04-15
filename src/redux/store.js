import { createStore, combineReducers, compose } from 'redux'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from '../services/firebase';

const rfConfig = {} // optional redux-firestore Config Options

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
   reduxFirestore(firebase, rfConfig), // firebase instance as first argument, rfConfig as optional second
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
    firestore: firestoreReducer
})


// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState);

// store.firestore.get({ collection: 'mafia-games', doc: 'goodgood' }).then( data => {
//     // data.docs.forEach( doc => {
//         data.ref.collection('players').get().then( res => {
//             res.docs.forEach( doc => console.log(doc.data()))
//         });
//     // })
// }).catch( err => {
//     console.log(err);
// })

// store.firestore.get({ collection: 'mafia-games', doc: 'John' }).then( data => {
//     data.docs.forEach( doc => {
    // console.log('hi');
    // console.log(data.exists);
    //     data.ref.collection('players').get().then( res => {
    //         res.docs.forEach( doc => console.log(doc.data()))
    //     });
    // })
// }).catch( err => {
//     console.log(err);
// })




export default store;