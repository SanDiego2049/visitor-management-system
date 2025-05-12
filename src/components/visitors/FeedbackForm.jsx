import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = useCallback((e) => {
    setFeedback(e.target.value);
  }, []);

  const handleFeedbackSubmit = useCallback((e) => {
    e.preventDefault();
    toast.success("Feedback submitted successfully!");
    setFeedback("");
  }, []);

  return (
    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
        placeholder="Leave your feedback about your visit experience..."
        value={feedback}
        onChange={handleFeedbackChange}
        rows={4}
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
