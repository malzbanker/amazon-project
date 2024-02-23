import React from 'react'
import { categoryImg } from './CategoryInfo'
import Categorycard from './CategoryCard'
import classes from './Category.module.css'

const Category = () => {
  return (
      <section className={classes.category_container}>
          {
              categoryImg.map((info) => (
                
                  <Categorycard data={info} />
              ))
          }
    </section>
  )
}

export default Category