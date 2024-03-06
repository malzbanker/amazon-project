import React, { useContext } from "react";
import classes from "./Header.module.css";
import {Link} from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import LowerHeader from './LowerHeader'
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const[{user,basket}, dispatch] = useContext(DataContext);
  const totlalItem = basket?.reduce((amount, item) => {
    return item.amount + amount  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="amazon logo"
              />
           </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" placeholder="search product"></input>
            <BsSearch size={38}/>
          </div>
          <div className={classes.Order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1280px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user&&"/auth"}>
              <div>
                {
                  user ? (
                  <>
                    <p> hello {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>sign out</span>
                  </>
                  ) : (
                    <>
                        <p> hello, sign In</p>
                        <span>Account & Lists</span>
                        </>
                    )}
           </div>
                

            
            </Link>
            <Link to="/orders">
             
                <p>returns</p>
                <span>&Orders</span>
            
            </Link>
                      <Link to="/cart" className={classes.cart}>
                      <BiCart size={35}/>
              <span>{totlalItem}</span>
              
              
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </section>
  );
};

export default Header;
