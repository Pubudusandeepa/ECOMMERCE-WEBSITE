import axios from 'axios'
import {CART_ADD_ITEM, CART_ERROR, CART_REMOVE_ITEM, CART_SHIPPING_SAVE,CART_PAYMENT_SAVE} from '../constant/cartConst'
import Cookie from 'js-cookie'

export const addToCart = (productId, qty) => async (dispatch, getState) =>{

    try {
        const {data} = await axios.get("/api/products/"+ productId)
     
       dispatch({
           type: CART_ADD_ITEM,
           payload: {
               product: data._id,
               name: data.name,
               image: data.image,
               price: data.price,
               countInStock: data.countInStock,
               qty
           }
       })
       const {cart:{cartItems}} = getState()
       Cookie.set("cartItems", JSON.stringify(cartItems))
    } catch (error) {
        dispatch({type: CART_ERROR, payload: error.message})
    }
}

export const saveShipping = (data) => dispatch => {
  
    dispatch({type: CART_SHIPPING_SAVE, payload: data })
}

export const savePaymentMethod = (data1) => dispatch => {
    
    dispatch({type: CART_PAYMENT_SAVE, payload: data1 })
}


export const removeFromCart = (productId) => (dispatch,  getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId})
    const {cart:{cartItems}} = getState()
    Cookie.set("cartItems", JSON.stringify(cartItems))
}