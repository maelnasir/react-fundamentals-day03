// FetchUsers.jsx
import { useFetch } from "../hooks/useFetch";

export default function FetchUsers() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <h2>Custom Hook: useFetch</h2>
      <ul>
        {data.map(u => (
          <li style={{textAlign:"left"}} key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
