import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import { Link } from 'react-router-dom'
import CheckoutStep from '../component/CheckoutSteps'


const PlaceholderScreen = (props) => {

     const cart = useSelector(state => state.cart)

     const {cartItems, shipping, payment} = cart
     console.log(cart)
     
     if(!shipping){
         props.history.push("/shipping")
     }
     else if(!payment){
         props.history.push("/payment")
     }
     
     const itemPrice = cartItems.reduce((a, c) => a + c.price*c.qty, 0)
     const shippingPrice = itemPrice > 100? 0 : 10
     const taxPrice = 0.15* itemPrice
     const totalPrice = itemPrice + shippingPrice + taxPrice

    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch()
   
    
    // useEffect(() =>{
    //    dispatch(saveShipping())
    //     return () => {
    //         //
    //       }
    // },[])

    const checkoutHandler = () => {
      props.history.push("/signin?redirect=shipping")
    }

    return <div>
        <CheckoutStep step1 step2 step3 step4 />
        <div className="placeorder">
         <div className="placeorder-info">
          <div>
            <h3>shipping</h3>
            <div>
            {cart.shipping.address}, {cart.shipping.city}
            {cart.shipping.postalCode}, {cart.shipping.country}
            </div>
          </div>
          <div>
           <h3>Payment</h3>
             <div>payment method: </div>
          </div>
         </div>
        <div className="placeholder-list">
          <ul className="cart-list-container">
           <li>
             <h3>
              shopping cart
             </h3>
             <div>
              Price
             </div>
            </li>
         
             {
                 cartItems.length === 0 ?   <div>cart is empty </div>  : cartItems.map(
                      item =>
                      <li>
                   
                     <div className="cart-image">
                      <img src={item.image} alt="product" />
                     </div>
                     
                      <div className="cart-name">
                      <div>
                       <Link to={"/product/"+ item.product}>
                       {item.name}
                       </Link>
                        
                      </div>
                      <div>
                        Qty: {item.qty}
                       
                     
                      </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    
                    </li>
                 )
             }
          </ul>
        </div>
        <div className="placeorder-action">
         <ul>
           <li>
           <button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length === 0}>Place order</button>
           </li>
           <li>
             <h3>Order Summary</h3>
           </li>
           <li>
             <div>Items</div>
             <div>${itemPrice}</div>
           </li>
           <li>
           <div>Shipping</div>
           <div>${shippingPrice}</div>
           </li>
         <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
       <li>
          <div>Order total</div>
          <div>${totalPrice}</div>
        </li>
         </ul>

        </div>
           
        </div>
      </div>
        
    
}

export default PlaceholderScreen