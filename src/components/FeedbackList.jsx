import React, { useMemo, useState } from "react";
import { useFeedbackContext } from "../hooks/useFeedback.jsx";

export default function FeedbackList() {
  const { feedback, loading, error, refetch } = useFeedbackContext();
  const [sortBy, setSortBy] = useState("recent"); // recent | rating

  // Compute stats
  const stats = useMemo(() => {
    const total = feedback.length;
    const avg = total === 0 ? 0 : feedback.reduce((s, f) => s + Number(f.rating), 0) / total;
    return { total, avg: Number(avg.toFixed(2)) };
  }, [feedback]);

  // Sort list
  const sorted = useMemo(() => {
    const copy = [...feedback];
    if (sortBy === "rating") {
      return copy.sort((a, b) => b.rating - a.rating);
    }
    // Recent first
    return copy.sort((a, b) => new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id));
  }, [feedback, sortBy]);

  return (
    <div style={{ border: "5px solid #22498d7f", padding: 12, borderRadius: 6 }}>
      <h2>Feedback List</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>Total:</strong> {stats.total}  
          <strong style={{ marginLeft: 12 }}>Average:</strong> {stats.avg}
        </div>

        <div>
          <label>
            Sort by{" "}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Recent</option>
              <option value="rating">Rating</option>
            </select>
          </label>
          <button onClick={refetch} style={{ marginLeft: 8 }}>Refresh</button>
        </div>
      </div>

      {loading && <p>Loading feedback...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && sorted.length === 0 && <p>No feedback yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
  {sorted.length === 0 && !loading && <p className="no-feedback">No feedback yet.</p>}
  {sorted.map((item) => (
    <li key={item.id} className="feedback-card">
      <div className="header">
        <div>
          <span className="name">{item.name}</span>{" "}
          <span className="email">({item.email})</span>
        </div>
        <div className="rating">Rating: {item.rating}</div>
      </div>
      <div className="comments">{item.comments}</div>
      <div className="date">{new Date(item.createdAt).toLocaleString()}</div>
    </li>
  ))}
</ul>

    </div>
  );
}
