import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCartAction } from "../redux/actions";

// for providing read access (for the products array) let's create mapStateToProps
// const mapStateToProps = (state) => ({
//   products: state.cart.products,
//   booksInStock: state.book.stock.length
// })

// const mapDispatchToProps = (dispatch) => ({
//   removeFromCart: (index) => {
//     console.log('index is', index)
//     dispatch(removeFromCartAction(index))
//   }
// })

// mapStateToProps and mapDispatchToProps were used in conjunction with connect
// to create a HOC (Higher Order Component) out of the Cart
// so a component with MORE PROPS than before

// redux hooks follow a completely different approach:
// thanks to useSelector and useDispatch, we take what we need DIRECTLY

const Cart = () => {
  // now that the function has been "opened" we can put our hooks here,
  // just before the return statement, without any loop, any wrapping
  // so we're not breaking the hooks rules

  const booksInStock = useSelector(state => state.book.stock.length)
  const products = useSelector(state => state.cart.products)
  // these are just other examples
  // const userName = useSelector(state => state.user.username)
  // const theWholeState = useSelector(state => state)
  // theWholeState.book.stock.length
  // const theNumberOfBooksInStock = useSelector(state => state.book.stock.length)
  // we just created a state constant with the whole redux store in it
  // so you can access state.book, state.user, state.cart.products
  // const mapStateToProps = state => state

  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <div>The main page has {booksInStock} products available</div>
        <ul style={{ listStyle: "none" }}>
          {products.map((book, i) => (
            <li key={i} className="my-4">
              <Button variant="danger" onClick={() => dispatch(removeFromCartAction(i))}>
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold">
          TOTAL:{" "}
          {products.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart;
// the connect function will accept up to 2 parameters (functions):
// one for READING from the redux store
// one for "WRITING" to the redux store