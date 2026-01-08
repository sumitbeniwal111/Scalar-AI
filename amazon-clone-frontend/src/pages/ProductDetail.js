import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ProductDetail() {
  const { id } = useParams();          
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  const images = product.image_urls || [];

  const addToCart = () => {
    API.post("/cart/add", {
      product_id: product.id,
      quantity: 1,
    }).then(() => alert("Added to cart"));
  };

  const buyNow = () => {
    API.post("/cart/add", {
      product_id: product.id,
      quantity: 1,
    }).then(() => navigate("/checkout"));
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <img
          src={images[activeImage]}
          alt="product"
          style={styles.mainImage}
        />

        <div style={styles.thumbnails}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              style={{
                ...styles.thumb,
                border:
                  index === activeImage
                    ? "2px solid #f08804"
                    : "1px solid #ddd",
              }}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>

      <div style={styles.right}>
        <h2>{product.name}</h2>

        <p style={styles.price}>₹{product.price}</p>

        <p>
          <strong>Status:</strong>{" "}
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <p>{product.description}</p>

        <button style={styles.cartBtn} onClick={addToCart}>
          Add to Cart
        </button>

        <button style={styles.buyBtn} onClick={buyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    padding: "30px",
    backgroundColor: "#eaeded",
  },
  left: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
  },
  mainImage: {
    width: "100%",
    height: "300px",
    objectFit: "contain",
  },
  thumbnails: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  thumb: {
    width: "60px",
    cursor: "pointer",
  },
  right: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    marginLeft: "20px",
  },
  price: {
    fontSize: "22px",
    color: "#B12704",
  },
  cartBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFD814",
    border: "none",
    marginBottom: "10px",
    cursor: "pointer",
  },
  buyBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFA41C",
    border: "none",
    cursor: "pointer",
  },
};

export default ProductDetail;
