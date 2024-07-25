import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './screens/home.jsx'
import Login from './screens/login.jsx'

import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/signup.jsx';
import CartProvider from './components/contextReducer.jsx';
import MyOrder from './screens/myOrder.jsx';

function App() {

  return (
    <>

      <CartProvider>

        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/myOrder" element={<MyOrder/>}/>
            </Routes>
            
          </div>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
