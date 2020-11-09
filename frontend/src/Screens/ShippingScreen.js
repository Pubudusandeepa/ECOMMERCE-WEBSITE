import React ,{useEffect, useState}from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {saveShipping} from '../actions/cartActions'
import CheckoutSteps from '../component/CheckoutSteps'


const ShippingScreen = (props) => {
 const [address, Setaddress] = useState('') 
 const [country, SetCountry] = useState('')
 const [city, SetCity] = useState('') 
 const [postalCode, SetPostalCode] = useState('') 

 
 const dispatch = useDispatch()

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShipping({address,country,city,postalCode}))
      props.history.push("/payment")
  }
 

    return <div>
    <CheckoutSteps step1 step2  />
    <div className="forms">
       <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
           <h3>Shipping</h3>
         </li>
       
         <li>
         <label htmlFor="address">
           Address
         </label>
         <input type="textarea" name="address" id="address" onChange={(e) => Setaddress(e.target.value)}></input>
         
        </li>
        <li>
        <label htmlFor="city">
          City
        </label>
        <input type="text" name="city" id="city" onChange={(e) => SetCity(e.target.value)}></input>
        
       </li>
        <li>
       <label htmlFor="postalcode">
          Postal Conde
       </label>
       <input type="text" name="postalcode" id="postalcode" onChange={(e) => SetPostalCode(e.target.value)}></input>
       
        </li>
        <li>
        <label htmlFor="country">
          Country
        </label>
        <input type="text" name="country" id="country" onChange={(e) => SetCountry(e.target.value)}></input>
        
         </li>
    
          <li>
           <button type="submit" className="button primary">Continue</button>
          </li>
        
        </ul>
       </form>
    </div>
    </div> 
    
}

export default ShippingScreen
