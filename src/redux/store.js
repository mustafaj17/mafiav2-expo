import { createStore } from 'redux'
import rootReducer from './reducers';

// Create store with reducers and initial state
const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;