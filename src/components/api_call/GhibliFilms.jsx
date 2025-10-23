// GhibliGallery.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function GhibliGallery() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [active, setActive] = useState(null); // active film for modal
  const closeBtnRef = useRef(null);

  const fetchFilms = async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await axios.get("https://ghibliapi.vercel.app/films");
      setFilms(data);
    } catch (e) {
      console.error(e);
      setErr("Failed to fetch films.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Focus the close button when modal opens (basic focus management)
  useEffect(() => {
    if (active && closeBtnRef.current) closeBtnRef.current.focus();
  }, [active]);

  const Card = ({ film }) => {
    const poster = film.image || film.movie_banner; // API usually provides both; poster first
    return (
      <button
        onClick={() => setActive(film)}
        style={{
          border: "none",
          background: "transparent",
          textAlign: "left",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label={`Open details for ${film.title}`}
      >
        <div
          style={{
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
            <img
              src={poster}
              alt={`${film.title} poster`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform .5s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          <div style={{ display:"flex", flexDirection:"column", padding: "12px 14px", alignItems:"top" }}>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 18 }}>{film.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
              {film.release_date} • {film.director}
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", padding: "24px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>🎞️ Studio Ghibli Gallery</h2>
        <button
          onClick={fetchFilms}
          disabled={loading}
          style={{
            marginLeft: "auto",
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid #ddd",
            background: "#d65500ff",
            cursor: "pointer",
          }}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </header>

      {err && <p style={{ color: "crimson", marginTop: 12 }}>{err}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 18,
          marginTop: 18,
        }}
      >
        {films.map((f) => (
          <Card key={f.id} film={f} />
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="film-title"
          onClick={() => setActive(null)} // backdrop click
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking content
            style={{
              width: "min(960px, 96vw)",
              background: "#111",
              color: "#eee",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr" }}>
              <div style={{ background: "#000", minHeight: 260 }}>
                <img
                  src={active.movie_banner || active.image}
                  alt={`${active.title} banner`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: 20 }}>
                <h3 id="film-title" style={{ marginTop: 0, marginBottom: 8 }}>
                  {active.title}
                </h3>
                <p style={{ margin: "0 0 10px 0", color: "#bbb" }}>
                  {active.release_date} • Dir. {active.director}
                  {active.producer ? ` • Prod. ${active.producer}` : ""}
                </p>
                <p style={{ lineHeight: 1.5, color: "#ddd" }}>
                  {active.description}
                </p>
                <div style={{ marginTop: 12, fontSize: 14, color: "#bbb" }}>
                  {active.running_time && <>⏱ {active.running_time} min&nbsp;&nbsp;</>}
                  {active.rt_score && <>⭐ {active.rt_score}/100</>}
                </div>
                <div style={{ marginTop: 16 }}>
                  <button
                    ref={closeBtnRef}
                    onClick={() => setActive(null)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 10,
                      border: "1px solid #444",
                      background: "#1a1a1a",
                      color: "#eee",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
