import React from 'react'
import CarouselEffect from '../../Components/CarouselEffect/Carousel';
import Category from '../../Components/Category/Category';
import Product from '../../Components/Products/Product';
import LayOut from '../../Components/LayOut/LayOut';
const Landing = () => {
  return (
      <LayOut>
        <CarouselEffect/>
        <Category />
         <Product />
    </LayOut>
  )
}

export default Landing