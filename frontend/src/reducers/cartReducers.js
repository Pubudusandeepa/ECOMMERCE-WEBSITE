import {CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SHIPPING_SAVE, CART_PAYMENT_SAVE} from '../constant/cartConst'
export function cartReducers(state = { cartItems: [], shipping: {}, payment: {} }, action){
    switch(action.type){
        case  CART_ADD_ITEM:
            const item = action.payload
            
            const product = state.cartItems.find(x => x.product === item.product)
        
            if(product){
              return {...state, cartItems: state.cartItems.map(x => x.product === product.product ? item : x) } 
            } 
          
                return {cartItems: [...state.cartItems, item]}
            
        case CART_REMOVE_ITEM:
            return {...state,cartItems: state.cartItems.filter(x => x.product !== action.payload)} 
        case CART_SHIPPING_SAVE:
              console.log(action.payload)
             return {...state, shipping: action.payload }  
         case CART_PAYMENT_SAVE:
           // console.log(action.payload)
             return {...state, payment: action.payload }          
         
        default:
                return state
    }
}
