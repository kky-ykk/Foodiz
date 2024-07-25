import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
  const navigate=useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const fetchFormData = async (e) => {
    e.preventDefault();
    console.log(credentials);

    let response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    response=await response.json();

    // console.log("login response:",response.token);

    //saving into localstorage
    localStorage.setItem("token",response.token);
    localStorage.setItem("userEmail",credentials.email);
    
    if (!response.success) alert("Enter valid Credentials!");
    else navigate("/");


  };

  return (

    

    <div style={{backgroundImage:'url("https://www.buytshirtdesigns.net/wp-content/uploads/2020/01/Fast-Food_16-scaled.jpg")'}}>

      <div className="text-center p-4">
        <Link className="navbar-brand text-warning" to="/" style={{fontStyle: "italic",fontSize: "x-large"}}>
              <b> Foodiz</b>
        </Link>
      </div>

      <div className="container bg-light text-dark fw-bold rounded p-5">

        <div>
          <form onSubmit={(e) => fetchFormData(e)}>
            

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
              <div id="emailHelp" className="form-text">
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

            <div className="text-center m-2">
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>

              <Link className="mt-3 text-primary m-3" to="/signup">
                I'm new user
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
