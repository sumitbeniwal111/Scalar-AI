import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const placeOrder = () => {
    if (!address) {
      alert("Please enter address");
      return;
    }

    API.post("/order/place", { address })
      .then((res) => {
        navigate(`/order/${res.data.order_id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>

      <textarea
        placeholder="Enter shipping address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={styles.textarea}
      />

      <button style={styles.btn} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    backgroundColor: "white",
    padding: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "15px",
  },
  btn: {
    backgroundColor: "#FFA41C",
    padding: "10px",
    border: "none",
    width: "100%",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Checkout;
