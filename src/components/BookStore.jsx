import { useState, useEffect } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Col, Row } from "react-bootstrap";
import { getBooksAction } from "../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// const mapStateToProps = state => ({
//   // the array of books available for purchase
//   booksInStock: state.book.stock,
//   errorCode: state.book.errorCode
// })

// const mapDispatchToProps = dispatch => ({
//   getBooks: () => {
//     dispatch(getBooksAction())
//   }
// })

const BookStore = () => {

  const [bookSelected, setBookSelected] = useState(null)

  const booksInStock = useSelector(state => state.book.stock)
  const errorCode = useSelector(state => state.book.errorCode)

  const dispatch = useDispatch()

  useEffect(() => {
    // WIP
    dispatch(getBooksAction())
  }, [])

  const changeBook = (book) => setBookSelected(book);

  return (
    <Row>
      <Col md={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          books={booksInStock}
          errorCode={errorCode}
        />
      </Col>
      <Col md={8}>
        <BookDetail
          bookSelected={bookSelected}
        />
      </Col>
    </Row>
  );
}

export default BookStore;
// we'll need both functionalities: read & write
