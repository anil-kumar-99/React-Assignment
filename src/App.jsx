import React from "react";
import { Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./hooks/useFeedback";
import FeedbackPage from "./pages/FeedbackPage";

export default function App() {
  return (
    <FeedbackProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </div>
    </FeedbackProvider>
  );
}
