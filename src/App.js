import "./App.css";
import useFetch from "./useFetch";

function App() {
  const { loading, data, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {data && <p>Data loaded</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
