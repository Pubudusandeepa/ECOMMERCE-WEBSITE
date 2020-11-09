import {
     PRODUCT_LIST_REQUEST, 
     PRODUCT_LIST_SUCCESS,
     PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_SAVE_REQUEST,
     PRODUCT_SAVE_SUCCESS,
     PRODUCT_SAVE_FAIL,
     PRODUCT_DELETE_REQUEST,
     PRODUCT_DELETE_SUCCESS,
     PRODUCT_DELETE_FAIL} from '../constant/productConstants'
import axios from 'axios'
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/products")
     
         
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

export const detailsProducts = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
        const {data} = await axios.get("/api/products/"+ productId)
       
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}
export const saveProducts = (product) =>  async (dispatch, getState) => {
     
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product})
        const {userSignin: {userInfo}} = getState()
        if(!product.id){
            const {data} = await axios.post("/api/products/", product, {
                headers:{
                    'Authorization': 'Barear' + userInfo.token
                }
            });
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }else{
            const {data} = await axios.put("/api/products/"+ product.id, product, {
                headers:{
                    'Authorization': 'Barear' + userInfo.token
                }
            })
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }
       
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message})
    }
}


export const deleteProduct = (productId) =>  async (dispatch, getState) => {
     
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
        console.log(productId)
        const {userSignin: {userInfo}} = getState()
        if(productId){
            const {data} = await axios.delete("/api/products/"+ productId, {
                headers:{
                    'Authorization': 'Barear' + userInfo.token
                }
            });
            dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success:true})
       
        }
       
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message})
    }
}


