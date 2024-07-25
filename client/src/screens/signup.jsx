import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const fetchFormData = async (e) => {
    e.preventDefault();
    // console.log(credentials);

    const response = await fetch(`https://foodiz.onrender.com/api/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    // console.log("response :",response);
    if (!response.ok) alert("Enter valid Credentials!");
    else     navigate("/login");
  };

  return (
    <>
      <div className="text-center p-4">
        <Link className="navbar-brand text-warning" to="/" style={{fontStyle: "italic",fontSize: "x-large"}}>
              <b> Foodiz</b>
        </Link>
      </div>
      <div className="container bg-light text-dark fw-bold rounded px-5 py-3">
        <div>
          <form onSubmit={(e) => fetchFormData(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={(e) => onChange(e)}
              />
              <div id="emailHelp" className="form-text text-dark">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={credentials.location}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="text-center m-1">
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>

              <Link className="mt-3 text-primary m-3" to="/login">
                Already user
              </Link>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
