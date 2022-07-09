import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin"
import HomePage from "./Components/HomePage";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate=useNavigate()
  const headers = {
    token: localStorage.getItem("user-token"),
    
  };

   
var token = headers.token;

  return (
    <div className="App" style={{backgroundColor:"GrayText",height:"1000px"}} >
      <Header/>
      <Routes>
 <Route path="/" element={<Signup/>} />
 <Route path="/login" element={<Signin/>} />
        
        {token?<Route path="/home" element={<HomePage/>} />: <Route path="/" element={<Signup/>} /> } 
      </Routes>

      
    </div>
  );
}

export default App;
