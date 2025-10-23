import { useEffect, useState } from "react";
import axios from "axios";

export default function ColorFetcher() {
    const [color, setColor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Helper to generate random hex (no #)
    const randomHex = () =>
        Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

    const fetchColor = async () => {
        setLoading(true);
        setError("");
        try {
            const hex = randomHex();
            const url = `https://www.thecolorapi.com/id?hex=${hex}`;
            const res = await axios.get(url);
            setColor(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch color 😿");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchColor(); // load one on mount
    }, []);

    return (
        <div
            style={{
                fontFamily: "sans-serif",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <h2>🎨 Random Color Generator</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {color && (
                <div
                    style={{
                        marginTop: "20px",
                        display: "inline-block",
                        textAlign: "center",
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: color.hex.value,
                            width: "200px",
                            height: "200px",
                            borderRadius: "10px",
                            margin: "0 auto 15px auto",
                        }}
                    ></div>
                    <h3>{color.name.value}</h3>
                    <p>
                        <strong>Hex:</strong> {color.hex.value}
                    </p>
                    <p>
                        <strong>RGB:</strong> {color.rgb.value}
                    </p>
                </div>
            )}
            <button
                onClick={fetchColor}
                disabled={loading}
                style={{
                    display: "block",
                    margin: "10px auto",
                    padding: "10px 20px",
                    fontSize: "1rem",
                    cursor: "pointer",
                }}
            >
                {loading ? "Loading..." : "Fetch Random Color"}
            </button>
        </div>
    );
}
