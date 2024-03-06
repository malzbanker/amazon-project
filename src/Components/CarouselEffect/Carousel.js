import React from 'react'
import { Carousel } from "react-responsive-carousel"
import {img} from './img/Data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel.module.css'
const CarouselEffect = () => {
  return (
      <div><Carousel
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={false}
          showThumbs={false}
      >
      {
        img.map((imgItemLink) => {
          return <img key={imgItemLink} src={imgItemLink} />
         
        })
          }
    </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  )
}

export default CarouselEffect