import React from 'react'
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Auth from './Pages/Auth/Auth'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout'
const stripePromise = loadStripe('pk_test_51Opxs1FEGlQm4gzwLo1tb3a6QJknG0HzFls3sNMEhLypQ24kX6XTIWEQt6cELoioh4bgoebzF0kcYgPaDsVa4BAt00gH1tlaow');

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={
          <ProtectedRout
            msg={"you must log in to pay"}
          redirect={"/payment"}>
          <Elements stripe={stripePromise}>
            <Payment />
            </Elements>
            </ProtectedRout >
          } />
        <Route path="/orders" element={
          <ProtectedRout
          msg={"you must log in to see your orders"}
        redirect={"/orders"}>
            <Orders />
          </ProtectedRout >
        } />
          
          
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        
        
      </Routes>
    </Router>
  )
}

export default Routing