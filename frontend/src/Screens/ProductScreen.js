import React ,{useEffect, useState}from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {detailsProducts} from '../actions/productActions'

const ProductScreen = (props) => {
  const productDetails = useSelector(state => state.productDetails)
   const [qty, setQty] = useState(1)
  
  const {loading, product, error } =  productDetails
  console.log(product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsProducts(props.match.params.id))
    return () => {
      //
    }
  }, [])

   const handleAddtoCart = () => {
     props.history.push("/cart/"+ props.match.params.id + "?qty="+ qty)
   }

    return <div>  
    
       <div className="back-to-result">
      <Link to="/">Back to result</Link>
     </div>
     { loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
     <div className="details">
       <div className="details-image">
         <img src={product.image} alt="product"></img>
       </div>
       <div className="details-info">
         <ul>
           <li>
             <h4>{product.name} {product.countInStock}</h4>
             
           </li>
           <li>
             {product.rating} Stars ({product.numReviews} Reviews)
           </li>
           <li>
            Price: <b>${product.price} </b>
         </li>
           <li>
             Description:
               <div>
                 {product.description}
               </div>
           </li>
         </ul>
       </div>
       <div className="details-action">
        <ul>
           <li>
             price: {product.price}
           </li>
           <li>
              Status: {product.countInStock > 0 ? "In stock": "out of stock"}
            </li>
           <li>
             Qty: <select value={qty} onChange={e => {setQty(e.target.value)}}>
                { [...Array(product.countInStock).keys()].map(x => 
                     <option key={x+1} value={x+1}>{x+1}</option>
                    ) }
                </select>
           </li>
           <li>
           {product.countInStock  > 0 ?  <button className="button primary" onClick={handleAddtoCart}>Add to Cart</button> : "out of stck"}
           
           </li>
        </ul>
       </div>
     </div>     
      )}
     
    </div>
      
    
}

export default ProductScreen
