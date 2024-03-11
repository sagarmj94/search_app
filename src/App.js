/** @format */

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const searchedFiledHighlighted = (text) => {
    if (!searchTerm) return text;

    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <span style={{ backgroundColor: "yellow" }}>
          {text.substring(index, index + searchTerm.length)}
        </span>
        {text.substring(index + searchTerm.length)}
      </>
    );
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setLoading(true);
        setListOfProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Please Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "80%", padding: "20px", margin: "10px" }}
      />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {listOfProducts.map((product) => {
            return (
              <li style={{ textAlign: "left" }}>
                {searchedFiledHighlighted(product.description)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
