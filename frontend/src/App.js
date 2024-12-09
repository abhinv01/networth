import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>

        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
