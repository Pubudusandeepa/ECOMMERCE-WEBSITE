import React ,{useEffect, useState}from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {saveProducts, listProducts, deleteProduct} from '../actions/productActions'


const ProductsScreen = (props) => {
  const [modelVisible, setModelVisible] = useState(false)
 const [id, setId] = useState('')
 const [name, setName] = useState('') 
 const [price, setPrice] = useState('') 
 const [image, setImage] = useState('') 
 const [brand, setBrand] = useState('') 
 const [category, setCategory] = useState('') 
 const [countInStock, setCountInStock] = useState('') 
 const [description, setDescription] = useState('') 
 const [reviews, setReviews] = useState('')
 const productList = useSelector(state => state.productList)
 const {loading, products, error} = productList
 const productSave = useSelector(state => state.productSave)  
 const {loding: loadingSave, success: successSave, error: errorSave} = productSave
 const dispatch = useDispatch()

  useEffect(() => {
    if(successSave) {
      setModelVisible(false)
    }
    dispatch(listProducts())
    return () => {
      //
    }
  }, [successSave])

  const openModal = (product) => {
    setModelVisible(true)
    setId(product._id)
    setName(product.name)
    setPrice(product.price)
    setImage(product.image)
    setBrand(product.brand)
    setCategory(product.category)
    setCountInStock(product.countInStock)
    setDescription(product.description)
    setReviews(product.numReviews)
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id))
    
  }

  const submitHandler = (e) => {
      e.preventDefault()
   
      dispatch(saveProducts({id,name,price,image,brand,category,countInStock,description}))
   
  }
  
    return <>
    <div className="content content-margined">
           <div className="product-header">
             <h3>Products</h3>
             <button className="button primary" onClick={() => openModal({})}>Create Product</button>
           </div>
      
           {!modelVisible &&
           <table className="table">
             <thead>
             <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
             
              <th>Action</th>
             </tr>
             </thead>
             <tbody>
             {products.map(product =>(<tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
            
              <td>
                <button className="button" onClick={() => openModal(product)}>Edit</button>
                {' '}
                <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
              </td>
              </tr>
               
             ))}
              <tr>
                <td></td>
              </tr>
             </tbody>
             </table>
           }
         </div>
           
       {modelVisible &&   <div className="forms">
       <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
           <h3>Create Product</h3>
         </li>
         <li>
          {loadingSave && <div>Loading ..</div>}
          {errorSave && <div>{errorSave}</div>}
          
         </li>
          <li>
           <label htmlFor="name">
             Name
           </label>
           <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
           
          </li>
          <li>
          <label htmlFor="price">
            Price
          </label>
          <input type="text" name="price" id="price" value={price}  onChange={(e) => setPrice(e.target.value)}></input>
         </li>  
         <li>
         <label htmlFor="image">
           Image
         </label>
         <input type="text" name="image" id="image" value={image}  onChange={(e) => setImage(e.target.value)}></input>
        </li>  
        <li>
        <label htmlFor="brand">
           Brand
        </label>
        <input type="text" name="brand" id="brand" value={brand}  onChange={(e) => setBrand(e.target.value)}></input>
       </li> 
        <li>
       <label htmlFor="category">
           Category
       </label>
       <input type="text" name="category" id="category" value={category}  onChange={(e) => setCategory(e.target.value)}></input>
      </li>
      <li>
      <label htmlFor="countInStock">
          Count in Stock
      </label>
      <input type="text" name="countInStock" id="countInStock" value={countInStock}  onChange={(e) => setCountInStock(e.target.value)}></input>
     </li>
     <li>
     <label htmlFor="description">
       Description
     </label>
     <textarea type="text" name="description" id="description" value={description}  onChange={(e) => setDescription(e.target.value)}></textarea>
     </li> 
    
          <li>
           <button type="submit" className="button primary">{id ? "Update": "Create"}</button>
           <button className="button secondary" onClick={() => setModelVisible(false)}>back</button>
          </li>
         
        </ul>
       </form>
       </div>
      }
     
     </> 
    
}

export default ProductsScreen
