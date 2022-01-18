import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import issuesReducer from './issues';

const store = createStore(
    combineReducers({ issues: issuesReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

store.subscribe(()=> {
    console.log('store', store.getState())
});

export default store;