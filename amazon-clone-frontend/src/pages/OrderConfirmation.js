import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/order/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!order) {
    return <p style={{ padding: "20px" }}>Loading order details...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.success}>✅ Order Placed Successfully</h2>

        <p>
          <strong>Order ID:</strong>{" "}
          <span style={styles.orderId}>{order.order_id}</span>
        </p>

        <p>
          <strong>Shipping Address:</strong><br />
          {order.address}
        </p>

        <hr />

        <h3>Items in your order</h3>

        {order.items.map((item, index) => (
          <div key={index} style={styles.itemRow}>
            <span>{item.product_name}</span>
            <span>
              {item.quantity} × ₹{item.price}
            </span>
          </div>
        ))}

        <hr />

        <h2 style={styles.total}>
          Total Paid: ₹{order.total_amount}
        </h2>

        <button style={styles.homeBtn} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#eaeded",
    minHeight: "100vh",
    padding: "40px 0",
  },
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "4px",
  },
  success: {
    color: "#067D62",
    marginBottom: "15px",
  },
  orderId: {
    backgroundColor: "#f0f2f2",
    padding: "4px 8px",
    borderRadius: "3px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
  total: {
    marginTop: "15px",
  },
  homeBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#FFD814",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default OrderConfirmation;
