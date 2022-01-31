// let's create action creators: these are functions meant to return
// the action objects

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const ADD_TO_CART_ERROR = 'ADD_TO_CART_ERROR'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'

// ACTION CREATOR -> just a function returning an action
export const addToCartAction = (book) => ({
  type: ADD_TO_CART,
  payload: book,
})

export const removeFromCartAction = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
})

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name,
})

// now with redux-thunk you can create much more powerful action creators
// because now you can still do it in the "old" way, so you can still dispatch actions (js objects)
// but now you can also dispatch FUNCTIONS

export const addToCartActionWithThunk = (book) => {
  return async (dispatch, getState) => {
    // now we can return a FUNCTION out of your action creator, not just an object!
    // what does this mean?
    // it means you can do your expensive operations, your fetches, your complex logic
    // and once its completed, you can dispatch the result
    console.log('this book has been added with redux-thunk')
    console.log("here's my state currently", getState())
    // for example, we could even do an async fetch here...
    if (getState().cart.products.length < 5) {
      // if the cart is not full yet
      setTimeout(() => {
        dispatch({
          type: ADD_TO_CART,
          payload: book,
        })
      }, 500)
    } else {
      // this means the cart is full
      dispatch({
        type: ADD_TO_CART_ERROR,
      })
    }
  }
}

export const getBooksAction = () => {
  // thanks to redux-thunk we can inject logic into our action creators
  return async (dispatch) => {
    try {
      let resp = await fetch('https://striveschool-api.herokuapp.com/food-books')
      if (resp.ok) {
        console.log(resp)
        let books = await resp.json()
        dispatch({
          type: GET_BOOKS,
          payload: books,
        })
      } else {
        // we got an error! probably 404, 500, 401, etc.
        dispatch({
          type: GET_BOOKS_ERROR,
          payload: resp.status,
        })
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
