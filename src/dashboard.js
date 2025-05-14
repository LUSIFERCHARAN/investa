import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./dashboard.css"; // Make sure the styles are applied correctly

const Dashboard = () => {
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [investments, setInvestments] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch investments after login
  const fetchInvestments = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/investments", {
        headers: { "x-auth-token": token },
      });
      setInvestments(res.data);
    } catch (err) {
      console.error("Error fetching investments:", err);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchInvestments();
    }
  }, [fetchInvestments, token]);

  const handleAddInvestment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/investments",
        { stockName, quantity, price },
        { headers: { "x-auth-token": token } }
      );

      alert("Investment added successfully!");
      setStockName("");
      setQuantity("");
      setPrice("");
      fetchInvestments(); // Refresh investments list
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add investment");
    }
  };

  const handleDeleteInvestment = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this investment?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/investments/${id}`, {
          headers: { "x-auth-token": token },
        });
        alert("Investment deleted successfully!");
        fetchInvestments(); // Refresh investments list
      } catch (err) {
        alert(err.response?.data?.msg || "Failed to delete investment");
      }
    }
  };

  // Calculate total investment
  const totalInvestment = investments.reduce((acc, inv) => acc + inv.quantity * inv.price, 0);

  return (
    <div className="dashboard-container">
      <h2>Investment Dashboard</h2>

      <form onSubmit={handleAddInvestment} className="investment-form">
        <input
          type="text"
          placeholder="Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit" className="btn-add">Add Investment</button>
      </form>

      <h3>Your Investments</h3>
      <ul>
        {investments.map((inv) => (
          <li key={inv._id} className="investment-item">
            <div>
              <strong>{inv.stockName}</strong> - {inv.quantity} shares @ ₹{inv.price}
            </div>
            <button
              className="btn-delete"
              onClick={() => handleDeleteInvestment(inv._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Display total investment */}
      <h3>Total Investment: ₹{totalInvestment}</h3>
    </div>
  );
};

export default Dashboard;
