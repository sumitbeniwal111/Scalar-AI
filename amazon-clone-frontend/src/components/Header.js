import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ search, setSearch, category, setCategory }) {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        Amazon
      </h2>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={styles.select}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Laptops">Laptops</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
        <option value="Accessories">Accessories</option>
        <option value="Books">Books</option>
        <option value="Beauty">Beauty</option>
        <option value="Sports">Sports</option>
        <option value="Groceries">Groceries</option>
        <option value="Toys">Toys</option>
      </select>

      <div style={styles.cart} onClick={() => navigate("/cart")}>
        🛒 Cart
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#131921",
    color: "white",
  },
  logo: {
    marginRight: "20px",
    cursor: "pointer",
  },
  search: {
    flex: 1,
    padding: "8px",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
    marginRight: "20px",
  },
  cart: {
    cursor: "pointer",
  },
};

export default Header;
