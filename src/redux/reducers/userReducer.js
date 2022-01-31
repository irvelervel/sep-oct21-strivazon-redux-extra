import { SET_USERNAME } from '../actions'
import { initialState } from '../store'

// splitting the reducer into multiple ones is a common practise!
// in the first place, it helps us finding the cases into potentially a very long file
// e.g. because for the user's cases we'll have a separate file,
// moreover, it will also simplify the reducers' logic
// because now every reducer will be ASSIGNED to just a slice of the state
// and it will have to mantain and return just its assigned portion :)

// the reducer is a pure function, no side-effects and with the same input
// will always produce the same output and YOU'RE NOT ALLOWED TO MANIPULATE YOUR ARGUMENTS

const userReducer = (state = initialState.user, action) => {
  // action is an object!

  // this is the object we are receiving and we should return every time:
  // {
  //     username: '',
  //     isError: false,
  //   },

  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      }

    default:
      return state
  }
}

export default userReducer
