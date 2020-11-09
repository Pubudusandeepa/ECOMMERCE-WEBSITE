import React, {useState, useEffect, } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import {listProducts} from '../actions/productActions'
const HomeScreen = (props) => {
 
 
  const productList = useSelector(state => state.productList)
  console.log(productList)
  const {products, loading, error} = productList
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(listProducts())
    
    return () => {
    
    }
  }, [])

    return loading ? <div>Loading..</div> : error ? <div>{error}</div>:
        <div>
        <ul className="products">
        {
         
          products.map(product => 
            <li key={product._id}>
            <Link to={'/product/'+ product._id}>
              <img className="product-image"  src={product.image} alt ="product"/>
            </Link>
            
            <div className="product-name">
              <Link to={'/product/'+ product._id}> {product.name}</Link> 
             
            </div>
            <div className="product-brand">{product.name}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
            </li>
          )
        
        }
      
         

       </ul>
        </div>
    
}

export default HomeScreen
