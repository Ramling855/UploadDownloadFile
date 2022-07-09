import React from "react";
import { Link } from "react-router-dom";
import  { LogoutOutlined } from '@ant-design/icons';
// import { Space } from 'antd';
import { useNavigate } from "react-router-dom";

function Header() {

    const headers = {
        token: localStorage.getItem("user-token"),
        
      };
    
       
    var token = headers.token;
    

const navigate=useNavigate()
const logout=()=>{
    localStorage.removeItem("user-token")
navigate("/")
}

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
         {token? <h5 className=" text-center" style={{ color: "white" }}>
           HomePage
          </h5>:" "}
          <button
            style={{ color: "white" }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
               {token?" ":<Link to="/login">Login</Link>}   
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                {token?" ":  <Link to="/">User Registrations</Link>}
                </a>
              </li>
            </ul>
          { token?<button style={{ backgroundColor: "black",color: "white" }} onClick={logout}  >    logout <LogoutOutlined/>
          </button>:""
   }   </div>
        </div>
</nav>
    </div>
  );
}

export default Header;
