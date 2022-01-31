import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CART_ERROR } from '../actions'
import { initialState } from '../store'

// splitting the reducer into multiple ones is a common practise!
// in the first place, it helps us finding the cases into potentially a very long file
// e.g. because for the user's cases we'll have a separate file,
// moreover, it will also simplify the reducers' logic
// because now every reducer will be ASSIGNED to just a slice of the state
// and it will have to mantain and return just its assigned portion :)

// the reducer is a pure function, no side-effects and with the same input
// will always produce the same output and YOU'RE NOT ALLOWED TO MANIPULATE YOUR ARGUMENTS

const cartReducer = (state = initialState.cart, action) => {
  // action is an object!
  switch (action.type) {
    case ADD_TO_CART:
      return {
        // this is the shape of the object we should return every time:
        // {
        // ...
        //   products: [],
        // }

        // action.payload is the book we want to add!
        ...state, // <-- we don't want to lose the user
        // ...state.cart is carrying over every other property
        // you might have into the cart sub-object apart from products!
        //   products: state.cart.products.push(action.payload), // <-- THIS IS SUPER BAD
        //   products: state.cart.products.concat(action.payload), // <-- THIS IS ALLOWED! :)
        products: [...state.products, action.payload], // THIS IS ALLOWED :)
        //   products: [],
      }

    case ADD_TO_CART_ERROR:
      return {
        ...state,
        isError: true,
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter((book, i) => i !== action.payload),
        // products: [...state.cart.products.slice(0, action.payload), ...state.cart.products.slice(action.payload + 1)], // <-- THIS ALSO WORKS :)
        // obv methods that mutate the original array (like .splice()) must not be used :(
        isError: false,
      }

    default:
      return state
  }
}

export default cartReducer
