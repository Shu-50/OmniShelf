
import axios from "axios";
import { useState } from "react";

const ArticleSummarizer = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!articleUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Encode the URL for the API request
      const encodedUrl = encodeURIComponent(articleUrl);
      const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodedUrl}&lang=en&engine=2`;

      const options = {
        method: "GET",
        url: apiUrl,
        headers: {
          "x-rapidapi-key": "cb5a0922bcmshb08c8a843419ea4p1888bajsnbf17edc3e6db",
          "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
        },
      };

      console.log("Request Options:", options);

      const response = await axios.request(options);
      console.log("Response Data:", response.data);

      setSummary(response.data.summary || "Summary not available.");
    } catch (err) {
      console.error("Error Response:", err.response);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch the summary. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black text-gray-300 p-4">
      <div className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-purple-400 text-center mb-6">
          Article Summarizer
        </h1>
        <div className="mb-4">
          <label htmlFor="article-url" className="text-sm mb-2">
            Enter Article URL:
          </label>
          <input
            type="text"
            id="article-url"
            className="w-full p-2 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-purple-500"
            placeholder="https://example.com/article"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
          />
        </div>
        <button
          onClick={handleSummarize}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        {error && (
          <div className="mt-4 p-2 bg-red-600 text-white text-sm rounded">
            {error}
          </div>
        )}
        {summary && (
          <div className="mt-6 p-4 bg-gray-900 rounded-md">
            <h2 className="text-lg font-bold text-purple-400 mb-2">Summary</h2>
            <p className="text-gray-300">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleSummarizer;
