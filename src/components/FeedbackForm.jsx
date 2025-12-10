import React, { useState } from "react";
import { useFeedbackContext } from "../hooks/useFeedback.jsx";
import { useNavigate } from "react-router-dom"; 


export default function FeedbackForm() {
  const { addFeedback } = useFeedbackContext();

  // Controlled form fields
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const payload = { name, email, rating: Number(rating), comments };

    try {
      await addFeedback(payload);
setStatus("success");

// Redirect to feedback page
navigate("/feedback");


      // Reset form
      setName("");
      setEmail("");
      setRating(5);
      setComments("");

      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: 6,
        marginBottom: "1.5rem",
      }}
    >
      <h2> Feedback Form</h2>
<p className="subtitle">
  Please fill in this form to let us know what you think about our product
  and help us improve your experience.
</p>


      <label>
        Name
        <input required value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Rating
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <label>
        Comments
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
        />
      </label>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
  <button type="submit" disabled={status === "loading"}>
    {status === "loading" ? "Submitting..." : "Submit"}
  </button>
  {status === "success" && (
    <span className="status-message" style={{ color: "green" }}>Submitted ✓</span>
  )}
  {status === "error" && (
    <span className="status-message" style={{ color: "red" }}>{errorMsg}</span>
  )}
</div>
    </form>
  );
}
