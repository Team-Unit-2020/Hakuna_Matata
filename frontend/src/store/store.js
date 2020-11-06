import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'

const middleware = [thunk];

const initialState = {
    user: null
}

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware)
));

export default store;