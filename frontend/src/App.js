import React from 'react';
import {useSelector} from 'react-redux'
import './index.css'
import './App.css';


import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import { CartScreen } from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProductsScreen from './Screens/ProductsScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PlaceHolderScreen from './Screens/PlaceholderScreen'
import PaymentScreen from './Screens/PaymentScreen'
function App() {

  const userSignin = useSelector(state => state.userSignin)

  const {userInfo} = userSignin
  console.log(userInfo);


  function openMenu(){
    document.querySelector(".sidebar").classList.add('open')
 }
function removeMenu(){
    document.querySelector(".sidebar").classList.remove('open')
 }


  return (
    <Router>
      <div className="grid-container">
       <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
              &#9776
          </button>
          <Link to="/">amazona</Link>
      
        </div>
       <div className="header-links">
       {
        userInfo ?  <Link to="/cart">Cart</Link> : <Link to="/signin">Sign In</Link> 
       }
       
         {' '}
         
         {
           userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin"></Link>
         }
       
        </div>
    
     </header>

     <aside className="sidebar" >
     <h3>Shopping Categories</h3>
     <button className="sidebar-close-button" onClick={removeMenu}>x</button>
     <ul>
         <li>
             <a href="index.html">Pants</a>
         </li>
         <li>
          <a href="index.html">Shirts</a>
      </li>
     </ul>
     </aside>

      <main className="main">
        <div className="content">
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/products" component={ProductsScreen} />
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/cart/:id?" exact={true} component={CartScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen}  />
        <Route path="/shipping" component={ShippingScreen}  />
        <Route path="/payment" component={PaymentScreen}  />
        <Route path="/placeholder" component={PlaceHolderScreen}  />
        </div>
      </main>
      <footer className="footer">
          All right reserved
      </footer>
      </div>
      </Router>
  );
}

export default App;
