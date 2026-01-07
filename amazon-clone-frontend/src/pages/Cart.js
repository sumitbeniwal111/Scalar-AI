import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  // ✅ FIX: use `total` instead of `total_amount`
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = () => {
    API.get("/cart")
      .then((res) => {
        setCart(res.data); // res.data has { items, total }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = (cartItemId) => {
    API.delete(`/cart/remove/${cartItemId}`)
      .then(() => fetchCart())
      .catch((err) => console.log(err));
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) return;

    API.put("/cart/update", {
      product_id: productId,
      quantity: qty,
    })
      .then(() => fetchCart())
      .catch((err) => console.log(err));
  };

  // ✅ FIX: calculate total quantity
  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.cartContainer}>
        <h2>Your Cart</h2>

        {cart.items.length === 0 && <p>Your cart is empty</p>}

        {cart.items.map((item) => (
          <div key={item.cart_item_id} style={styles.cartItem}>
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <div style={styles.qtyRow}>
                <button onClick={() => updateQty(item.product_id, item.quantity - 1)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => updateQty(item.product_id, item.quantity + 1)}>+</button>
              </div>

              <button
                style={styles.removeBtn}
                onClick={() => removeItem(item.cart_item_id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <h3>Order Summary</h3>
        <p>Total Items: {totalItems}</p>

        {/* ✅ FIX: use cart.total */}
        <h2>Total: ₹{cart.total}</h2>

        <button
          style={styles.checkoutBtn}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    padding: "20px",
    backgroundColor: "#eaeded",
    minHeight: "100vh",
  },
  cartContainer: {
    flex: 3,
    backgroundColor: "white",
    padding: "20px",
    marginRight: "20px",
  },
  cartItem: {
    borderBottom: "1px solid #ddd",
    padding: "15px 0",
  },
  removeBtn: {
    backgroundColor: "#FFD814",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    marginTop: "5px",
  },
  summary: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    height: "fit-content",
  },
  checkoutBtn: {
    width: "100%",
    backgroundColor: "#FFA41C",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
  },
};

export default Cart;
