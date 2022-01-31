import { Alert } from "react-bootstrap";
import Book from "./Book";

const BookList = ({ books, changeBook, bookSelected, errorCode }) => (
  <div>
    {
      errorCode && (
        <Alert variant="danger">
          An error occurred: {errorCode}
        </Alert>
      )
    }
    {books.map((book) => (
      <Book
        key={book.id}
        book={book}
        changeBook={changeBook}
        bookSelected={bookSelected}
      />
    ))}
  </div>
);

export default BookList;
