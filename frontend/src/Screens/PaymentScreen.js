import React ,{ useState}from 'react'

import { useDispatch} from 'react-redux'

import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../component/CheckoutSteps'

const PaymentScreen = (props) => {
const [paymentMethod, SetpaymentMethod] = useState('') 

const dispatch = useDispatch()

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod({paymentMethod}))
      props.history.push("/placeholder")
  }
 

    return <div>
    <CheckoutSteps step1 step2 step3 />
    <div className="forms">
       <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
           <h3>Payment</h3>
         </li>
       
         <li>
         <label htmlFor="paymentMethod">
           Paypal
         </label>
        
         <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => SetpaymentMethod(e.target.value)}></input>
         
        </li>
    
          <li>
         {
            paymentMethod ==='paypal'?   <button type="submit"  className="button primary">Continue</button> :   <button type="submit"  className="button primary" disabled={true}>Continue</button>
         }
       
           
          </li>
        
        </ul>
       </form>
    </div>
    </div> 
    
}

export default PaymentScreen
