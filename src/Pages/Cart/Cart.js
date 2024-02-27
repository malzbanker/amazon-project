import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import ProductCard from '../../Components/Products/ProductCard'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import  classes  from './Cart.module.css'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const Cart = () => {
const [{basket,user},dispatch]=useContext(DataContext)
  const total = basket.reduce((amount, item) => {
  return item.price * item.amount + amount
  }, 0)
  console.log(basket)

  const increament = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }
  const decreament = (id)=> {
  dispatch({
type:Type.REMOVE_FROM_BASKET,id
  })
  }

    return (
      <LayOut>
        <section className={classes.container}> 
          <div className={classes.cart_container}>
            <h2>Hello</h2>
            <h3>Your Shopping basket</h3>
            <hr />
            {
              basket?.length == 0 ? (<p>opps ! No item in your cart</p>) : (basket?.map((item, i) => {
                return <section className={classes.cart_product}>
                  <ProductCard
                  key={i}
                  product = { item }
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                  />
                <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={() => increament(item)}>
                      <IoIosArrowUp size={25} /> 
                      
                    </button>
                    <span>{item.amount}</span>
                    <button className={classes.btn} onClick={() => decreament(item.id)}>
                      <IoIosArrowDown size={25}/>
                  </button>
                </div>

                </section>
                
                
              }))
            }
          </div>
          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>subtotal({basket?.length}items)</p>
                <CurrencyFormat amount={total}/>
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contain a gift</small>
              </span>
              <Link to='/payments'>Continue to checkout</Link>
            </div>
          )}
    </section>
    </LayOut>
  )
}

export default Cart