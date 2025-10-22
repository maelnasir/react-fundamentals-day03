// NameSaver.jsx
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function NameSaver() {
  const [name, setName] = useLocalStorage("username", "");

  return (
    <div>
      <h2>Custom Hook: useLocalStorage</h2>
      <input
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name || "Guest"}!</p>
    </div>
  );
}
