// Counter.jsx
import { useCounter } from "../hooks/useCounter";

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <h2>Custom Hook: useCounter</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
      <button onClick={decrement}>−</button>
    </div>
  );
}
