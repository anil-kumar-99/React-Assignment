import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const API_BASE = "http://localhost:4000";
const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const value = useProvideFeedback();
  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export function useFeedbackContext() {
  return useContext(FeedbackContext);
}

function useProvideFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch feedback from backend
  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/feedback`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();

      const withTimestamp = data.map(item => ({
        ...item,
        createdAt: item.createdAt || new Date().toISOString(),
      }));

      setFeedback(withTimestamp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  // Add feedback (POST)
  const addFeedback = async (payload) => {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
    });

    if (!res.ok) throw new Error("Failed to submit feedback");

    const newItem = await res.json();
    setFeedback((prev) => [newItem, ...prev]);
    return newItem;
  };

  return {
    feedback,
    loading,
    error,
    addFeedback,
    refetch: fetchFeedback,
  };
}
