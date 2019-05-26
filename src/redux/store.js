import { createStore } from 'redux'

export const reducer = (state = {POP:'POP'}, action) => {
    return state
}

// Create store with reducers and initial state
const store = createStore(
   reducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
export const firestore = store.firestore;