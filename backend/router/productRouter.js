import express from 'express'
import Product from '../models/productModel'
import {getToken, isAdmin, isAuth} from '../util'
const router = express.Router()




router.get("/", async (req, res) =>{
   const products = await Product.find({})
   res.send(products)
})


router.get("/:id", async (req, res) =>{
    const id = req.params.id
    console.log(id)
  try {
    const product = await Product.findById(id)
    if(product){
        res.send(product)
    }
    res.status(404).send('Product is not found')
  } catch (error) {
      res.status(500).send('Internal error')
  }
    
  

    
 })
 

router.post("/", isAuth, isAdmin, async (req, res) =>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        // rating: req.body.rating,
        // numReviews: req.body.numReviews,
    })

    const newProduct = await product.save()

    if(newProduct) {
       return  res.status(201).send({message: 'New Product Created', data: newProduct})
    }
    return res.status(500).send({message:'Error' })
})

router.put("/:id", isAuth, isAdmin, async (req, res) =>{
    const id = req.params.id
    const product = await Product.findOne({_id: id})

    if(product){
        console.log("hai")
        product.name = req.body.name
        product.price = req.body.price
        product.image = req.body.image
        product.brand = req.body.brand
        product.category = req.body.category
        product.countInStock = req.body.countInStock
        product.description = req.body.description
        // product.rating = req.body.rating
        // product.numReviews = req.body.numReviews

        const updateProduct = await product.save()

        if(newProduct) {
           return  res.status(200).send({message: 'New Product update', data: updateProduct})
        }

    }

     return res.status(500).send({message:'Error' })
})

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deleteProduct = await Product.findById(req.params.id)
    if(deleteProduct){
        await deleteProduct.remove()
        res.send({message: "Product deleted"})
    }else{
        res.send("error in deletion")
    }
   
})


export default router