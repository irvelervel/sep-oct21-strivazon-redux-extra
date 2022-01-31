import { GET_BOOKS, GET_BOOKS_ERROR } from '../actions'
import { initialState } from '../store'

const bookReducer = (state = initialState.book, action) => {
  switch (action.type) {
    case GET_BOOKS:
      // fetch() <-- this may fail, and you never want to fail in a reducer!
      return {
        ...state,
        stock: action.payload,
        // from being an empty array, now stock gets filled up!
      }

    case GET_BOOKS_ERROR:
      return {
        ...state,
        errorCode: action.payload,
      }

    default:
      return state
  }
}

export default bookReducer
