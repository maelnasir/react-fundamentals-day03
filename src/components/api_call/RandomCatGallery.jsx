// RandomCatGallery.jsx
import { useEffect, useState } from "react";

export default function RandomCatGallery() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔑 Internal API key (demo use only)
  const CAT_API_KEY = "live_dZ3zF5Ry6tUSxug1LQuf0ZCQnGq1iQ3z6O0oJbMZVvK2Wl9oN5oE9yTi0sL4yQHk"; 

  const fetchCats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=12&size=small",
        {
          headers: { "x-api-key": CAT_API_KEY },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCats(data);
    } catch (err) {
      console.error(err);
      setError("😿 Failed to fetch cats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🐾 Random Cat Gallery</h2>
      <button onClick={fetchCats} disabled={loading}>
        {loading ? "Loading..." : "Fetch More Cats"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {cats.map((cat) => (
          <div key={cat.id} style={{ borderRadius: "8px", overflow: "hidden" }}>
            <img
              src={cat.url}
              alt="cute cat"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
