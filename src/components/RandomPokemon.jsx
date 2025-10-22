import { useEffect, useState } from "react";

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(151);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemon() {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setPokemon({
          name: data.name,
          sprite: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          type: data.types.map((t) => t.type.name).join(", "),
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch Pokémon:", err);
          setPokemon(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    console.log(`✨ Pokémon ID changed to ${id}`);
    return () => console.log(`🧹 Cleaning up for Pokémon ID ${id}`);
  }, [id]);

  const nextPokemon = () => setId((n) => (n % 151) + 1);
  const prevPokemon = () => setId((n) => (n === 1 ? 151 : n - 1));

  // ✅ new input handler
  const handleInputChange = (e) => {
    const newId = parseInt(e.target.value, 10);
    if (!isNaN(newId) && newId > 0 && newId <= 151) {
      setId(newId);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <h2>Pokémon Viewer ⚡</h2>

      {/* ✅ new input field */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="pokeId">Enter Pokémon ID (1–151): </label>
        <input
          id="pokeId"
          type="text"
          min="0"
          max="151"
          value={id}
          onChange={handleInputChange}
          style={{ width: 80, textAlign: "center" }}
        />
      </div>

      {loading ? (
        <p>Loading Pokémon...</p>
      ) : pokemon ? (
        <div
          className="pokemon-info"
          style={{
            minWidth:350,
            border: "2px solid #e0e0e0",
            borderRadius: 12,
            padding: 16,
            display: "inline-block",
            backgroundColor: "#fafafa",
            color: "#333",
          }}
        >
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            width={120}
            height={120}
            style={{ imageRendering: "pixelated" }}
          />
          <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>
          <p>Type: {pokemon.type}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      ) : (
        <p>No Pokémon found.</p>
      )}

      <div style={{ marginTop: 20 }}>
        <button style={{padding:10, margin:5}} onClick={prevPokemon}>⬅️ Prev Pokémon</button>
        <button style={{padding:10, margin:5}} onClick={nextPokemon}>Next Pokémon ➡️</button>
      </div>
    </div>
  );
}
