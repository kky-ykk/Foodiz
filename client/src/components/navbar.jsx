import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./contextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";


export default function Navbar() {
  const navigate = useNavigate();
const [cartView, setCartView] = useState(false);

  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{background:"#FFA62F"}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{fontStyle: "italic",fontSize: "x-large"}}>
            <b> Foodiz</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem("token") ? (
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>

            <div className="d-flex">
              {!localStorage.getItem("token") ? (
                <div>
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to="/signup">
                    Signup
                  </Link>
                </div>
              ) : (
                <div>
                  <Link className="btn bg-white text-dark mx-1"  onClick={()=>setCartView(true)}>
                     My cart{" "}
                     <span className="badge bg-secondary">{items.length}</span>
                  </Link>
                  
                  {cartView? <Modal onClose={()=>{setCartView(false)}}>
                    <Cart key={"cart"}></Cart>
                  </Modal>:null }

                  <Link
                    className="btn bg-white text-danger mx-1"
                    onClick={removeToken}
                    to="/"
                  >
                    log out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
