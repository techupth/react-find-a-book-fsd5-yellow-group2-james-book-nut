import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [bookInput, setBookInput] = useState("");
  const [bookName, setBookName] = useState([]);
  const serchBookName = async () => {
    const getBookName = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookInput}`
    );
    setBookName(getBookName.data.items);
  };
  useEffect(() => {
    serchBookName();
  }, [bookInput]);

  return (
    <div className="App">
      <div className="find-book">
        <h1>Find a Book</h1>
        <input
          type="text"
          onChange={(e) => {
            setBookInput(e.target.value);
          }}
        />
        <ul>
          {bookName.map((book, index) => (
            <li key={index}>
              <h2>{book.volumeInfo.title}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
