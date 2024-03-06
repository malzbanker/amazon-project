import React,{useContext,useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Products/ProductCard'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../Api/axios'
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import { Type } from '../../Utility/action.type'
import { useNavigate } from "react-router-dom";


const Payment = () => {
  // const [{user, basket }] = useContext(DataContext);
  // const totlalItem = basket?.reduce((amount, item) => {
  //   return item.amount + amount;
  // }, 0);
  
  // const total = basket.reduce((amount, item) => {
  //   return item.price * item.amount + amount
  //   }, 0)

  // const [cardError, setCardError] = useState(null)
  // const[processing,setProcessing]=useState(false)
  
  // const stripe = useStripe();
  // const elements = useElements();

  // const handleChange = (e) => {
  //   console.log(e);
  //   e?.error?.message ? setCardError( e?.error?.message ) : setCardError("")
  // };

  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setProcessing(true)
  //         // 1.contact function to get client secret
  //     const response = await axiosInstance({
  //       method: "POST",
  //       url: `/payment/create?total=${total*100}`,
  //     })
  //     console.log(response.data)
  //     const clientSecret = response.data?.clientSecret
  //     ;
  //     // 2.react side confirmation
  //     const {PaymentIntent} = await stripe.confirmCardPayment
  //       (clientSecret,{
  //       payment_metod: {
  //           card: elements.getElement(CardElement),
  //         },
  //       }
       
  //     );

  //     console.log(PaymentIntent);
  //     setProcessing(false)
  //   } catch (error) {
  //     console.log(error)
  //     setProcessing(false)
  //   }



  //   // 3.save order in firestore and clear basket
  // };

  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);

  const totlalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2. client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);

      // 3. after the confirmation --> order firestore database save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    }  catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };



    return (
      <LayOut>
        {/* header */}
        <div className={classes.payment__header}>
          checkout {totlalItem} items
        </div>
        {/* payment method */}
        <section className={classes.payment}>
          {/* adress */}
          <div className={classes.flex}>
            <h3>delivery address</h3>
            <div>
              <div>{user?.email}</div>
              <div>Ethiopia</div>
              <div>addis ababa</div>
             
            </div>
          </div>
          <hr />
          {/* product */}
          <div className={classes.flex}>
            <h3>Review items and Delivery</h3>
            <div>
              
                { basket?.map((item, j) => <ProductCard product={item} key={j} flex={true} />)}
              
            </div>
          </div>
          <hr />
          {/* card form */}
          <div className={classes.flex}>
            <h3>payment methods</h3>
            <div className={classes.payment__card__container}>
              <div className={classes.payment__details}>
                <form onSubmit={handlePayment}>
                  {/* error */}
                  {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                  {/* card element */}
                  <CardElement onChange={handleChange} />
                  {/* price */}

                  <div className={classes.payment__price}>
                    <div>
                      <span style={{display:"flex", gap:"10px"}}>
                        <p>total order | </p><CurrencyFormat amount={total}/>
                    </span>
                    </div>
                    <button type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color='gray' size={12} />
                          <p>please wait...</p>
                        </div>
                      ): " pay now"
                      }
                     
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </LayOut>
  )
}

export default Payment