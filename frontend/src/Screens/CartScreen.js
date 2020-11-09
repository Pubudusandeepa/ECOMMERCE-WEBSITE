import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import { Link } from 'react-router-dom'
export const CartScreen = (props) => {

     const cart = useSelector(state => state.cart)

     const {cartItems} = cart
     console.log(cartItems)

    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch()
   
     const removeFormCartHandler = (productId) => {
         dispatch(removeFromCart(productId))
 
     }

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
        return () => {
            //
          }
    },[])

    const checkoutHandler = () => {
      props.history.push("/signin?redirect=shipping")
    }

    return (
        <div className="cart">
        <div className="cart-list">
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
                        Qty:
                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                         {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x+1} value={x+1}>{x+1}</option>
                          )}
                        </select>
                        <button type="button" className="button" onClick={() =>removeFormCartHandler(item.product)}>
                           Delete
                        </button>
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
        <div className="cart-action">
           <h3>
              Subtotal ({cartItems.reduce((a,b) => a + b*qty, 0)} items)
              :
              $ {cartItems.reduce((a, c) => a+ c.price* c.qty, 0)}
           </h3>
         <button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length === 0}>
          Proceed to Checkout
         </button>
        </div>
           
        </div>
    )
}