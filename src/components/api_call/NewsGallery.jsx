import { useEffect, useState } from "react";

export default function NewsGallery() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔑 Replace this with your own NewsAPI key
  const API_KEY = "917c7f2d6efd4880a8bc47981ae4b120";
  const URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${API_KEY}`;

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // ✅ Filter out articles that don't have an image
      const withImages = (data.articles || []).filter(
        (a) => a.urlToImage && a.urlToImage.trim() !== ""
      );
      setArticles(withImages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news articles 😿");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui, Arial",
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius:"10px",
      }}
    >
      <h2 style={{ color:"#333" }}>🗞️ Top Headlines</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {articles.map((a, i) => (
          <div
            key={i}
            style={{
              background: "transparent",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "left",
              color:"#333",
            }}
          >
            <img
              src={a.urlToImage}
              alt={a.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
              loading="lazy"
            />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ margin: "0 0 8px", color:"#333" }}>{a.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {a.description || "No description available."}
              </p>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  color: "#0077cc",
                  textDecoration: "none",
                }}
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
