import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './product.module.css'

const Product = () => {
    const [ products, setproducts] = useState()
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setproducts(res.data)
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    },[])

  return (
      <section className={classes.products_container}>
          {
              products?.map((singleproduct,id) => { 
                  return <ProductCard product={singleproduct} key={id} />
          }) 

          }


     </section>
  )
}

export default Product