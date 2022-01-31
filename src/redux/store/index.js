import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import cartReducer from '../reducers/cartReducer'
import userReducer from '../reducers/userReducer'

import thunk from 'redux-thunk' // <-- this must be used with applyMiddleware
import bookReducer from '../reducers/bookReducer'

// this is the compose function the devTools team came up with
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// if you use the above one, you can mantain the devTools enabled and you can apply the redux-thunk middleware
const composeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  // our intention is to have a cart array here
  // let's put it into a sub-object that will hold
  // potentially every cart-related property
  cart: {
    // ...
    products: [],
    isError: false,
  },
  user: {
    username: '',
  },
  book: {
    stock: [],
    errorCode: null,
  },
}

const bigReducer = combineReducers({
  cart: cartReducer, // <-- I chose 'cart' as the key because 'cart' is one of the sub-objects of my state!
  user: userReducer,
  book: bookReducer,
})

let configureStore = createStore(
  bigReducer,
  initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeThatAlwaysWorks(applyMiddleware(thunk))
)
// 1) the main reducer
// 2) the initial state
// 3) the enhancer function

export default configureStore

// redux-thunk is an external plugin that will allow us to inject async logic
// into the redux flow, so e.g. we can save into the redux store the result
// of side-effects/async operations, like a fetch!

// 1) install the package --> npm i redux-thunk
// 2) using it into the third argument of createStore, the enhancer/middleware function!
