import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { productUrl } from '../../Api/endPoints'
import { useState } from 'react'
import ProductCard from '../../Components/Products/ProductCard'
import Loader from '../../Components/Loader/Loader'


const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setproduct] = useState({})
  const [isLoading,setIsLoading ]=useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data)
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
 },[])
    return (
      <LayOut>
        {isLoading?(<Loader/>) : (<ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />)}
        
     </LayOut>
  )
}

export default ProductDetail