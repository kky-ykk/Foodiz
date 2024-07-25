import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>

        <div className="container">
  <footer className="row row-cols-5 py-5 my-5 border-top">
    <div className="col">
      <Link className="navbar-brand text-warning" to="/" style={{fontStyle: "italic",fontSize: "x-large"}}>
            <b> Foodiz</b>
          </Link>
      <p className="text-muted">Good Delivery © 2024</p>
    </div>

    <div className="col">

    </div>

    <div className="col">
      <h5>Section</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
        <li className="nav-item mb-2"><Link to="/myOrder" className="nav-link p-0 text-muted">MyOrder</Link></li>
      </ul>
    </div>

  </footer>
</div>

    </div>
  )
}
