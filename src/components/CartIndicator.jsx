import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from "react";
import { setUsernameAction } from "../redux/actions";
import { useDispatch } from "react-redux";
// connect creates a HOC from CartIndicator
// a HIGHER ORDER COMPONENT, with the same capabilities as before and more...
// tipically a HIGHER ORDER COMPONENT has MORE PROPS than before!

// const mapStateToProps = (state) => ({
//   // every property of the object we return from mapStateToProps
//   // is going to be a new prop for this component
//   // we want to read the length of the cart, more specifically cart.products
//   cartLength: state.cart.products.length,
//   // ...state // doing this you're providing your component with all the redux
//   // store properties, this may work but it's kind of overkill
//   // try to taylor down the exact props/values your component is in need of
//   username: state.user.username
// })

// const mapDispatchToProps = (dispatch) => ({
//   setUsername: (name) => {
//     dispatch(setUsernameAction(name))
//   }
// })

const CartIndicator = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const cartLength = useSelector(state => state.cart.products.length)
  const username = useSelector(state => state.user.username)

  const dispatch = useDispatch()

  return (
    <div className="ml-auto mt-2">
      {/* for understanding if I need to show the button OR the input field */}
      {/* I need to know if the user is already logged in */}
      {/* so I just have to check the user.username property from the redux store */}
      {
        username ? (
          <Button color="primary" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        ) : (
          <Form.Control
            type="text"
            placeholder="Strivazon login"
            value={name}
            onChange={e => {
              console.log('CHARACTER:', e.target.value)
              setName(e.target.value)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                console.log('just pressed enter!')
                // here now I want to send my username to the redux store!
                dispatch(setUsernameAction(name))
              }
            }}
          />
        )
      }


    </div>
  )
}

export default CartIndicator
// connect can take up to 2 arguments:
// at least it should receive mapStateToProps
// if we provide mapStateToProps, CartIndicator will be able to READ
// from the redux store!
// if you also want to DISPATCH ACTIONS from this component, in order
// to CHANGE the redux store, you'll need also mapDispatchToProps

// in CartIndicator we just need to READ the cart length...
// ...so we'll just need mapStateToProps

// for reading a value from the redux store or interacting with it (dispatching
// an action) we need to CONNECT the component to it