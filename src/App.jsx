import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [bookQueryString, setBookQueryString] = useState("");
  const [bookResults, setBookResults] = useState([]);

  function submitBookQuery(e) {
    // check if keypress was enter
    if (e.key === "Enter") {
      // send get query to server with axios
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${bookQueryString}`)
        .then((response) => {
          // set book results
          setBookResults(response.data.items);
          // clear book query string
          setBookQueryString("");
        });
    }
  }

  useEffect(() => {
    if (bookQueryString !== "") {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${bookQueryString}`)
        .then((response) => {
          // set book results
          setBookResults(response.data.items);
        });
    }
  }, [bookQueryString]);

  // render book titles in a list
  const bookResultsList = bookResults.map((book) => {
    return <li key={book.id}>{book.volumeInfo.title}</li>;
  });

  return (
    <div className="App">
      <h1>Find a book</h1>
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        type="text"
        id="book-query-string"
        onChange={(e) => setBookQueryString(e.target.value)}
        onKeyDown={submitBookQuery}
      />
      <ul>{bookResultsList}</ul>
    </div>
  );
}

export default App;
