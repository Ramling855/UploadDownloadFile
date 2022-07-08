import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserRegistration from "./Components/UserRegistration";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
function App() {
  let token = localStorage.getItem("token");
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {token ? <Route path="/home" element={<Home />} /> : ""}
        <Route path="/" element={<UserRegistration />} />
        <Route path="/" element={<UserRegistration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
