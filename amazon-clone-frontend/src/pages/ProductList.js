import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   
import API from "../services/api";

function ProductList({ search, category }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();                

  useEffect(() => {
    API.get("/products", {
      params: {
        search,
        category,
      },
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [search, category]);

  const addToCart = (e, productId) => {
    e.stopPropagation(); 
    API.post("/cart/add", {
      product_id: productId,
      quantity: 1,
    })
      .then(() => alert("Product added to cart"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      {products.length === 0 && <p>No products found</p>}

      {products.map((product) => (
        <div
          key={product.id}
          style={styles.card}
          onClick={() => navigate(`/product/${product.id}`)} 
        >
          <img
            src={product.image_urls?.[0]}
            alt={product.name}
            style={styles.image}
          />
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>

          <button
            style={styles.button}
            onClick={(e) => addToCart(e, product.id)} 
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    backgroundColor: "white",
    cursor: "pointer", 
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  button: {
    backgroundColor: "#FFD814",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    width: "100%",
  },
};

export default ProductList;
