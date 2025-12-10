import React, { useState } from "react";
import { useFeedbackContext } from "../hooks/useFeedback";

export default function FeedbackPage() {
  const { feedback, loading, error, refetch } = useFeedbackContext();
  const [sort, setSort] = useState("recent");

  const sortedFeedback = [...feedback].sort((a, b) => {
    if (sort === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "rating-high") return b.rating - a.rating;
    if (sort === "rating-low") return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="feedback-list-wrapper">
      <div className="feedback-list-box">

        <h2 className="feedback-title">All Feedback</h2>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label style={{ fontWeight: 600 }}>Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              marginTop: "8px",
              width: "150px",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              background: "#f1f5f9",
              fontSize: "15px"
            }}
          >
            <option value="recent">Recent</option>
            <option value="rating-high">Rating High → Low</option>
            <option value="rating-low">Rating Low → High</option>
          </select>
        </div>

        <button onClick={refetch}>Refresh</button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {sortedFeedback.length === 0 ? (
          <p className="no-feedback">No feedback yet</p>
        ) : (
          sortedFeedback.map((item) => (
            <div key={item.id} className="feedback-card">
              <p className="card-name">
                {item.name} ({item.email})
              </p>
              <p>Rating: {item.rating}</p>
              <p>{item.message}</p>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
