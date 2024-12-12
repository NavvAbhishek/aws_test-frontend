import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      App
      <button onClick={() => navigate("/users")}>Users</button>
    </div>
  );
};

export default App;
