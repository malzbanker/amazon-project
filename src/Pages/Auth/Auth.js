import React,{useState,useContext} from 'react'
import classes from './SignUp.module.css'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import {auth} from '../../Utility/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import {ClipLoader } from 'react-spinners'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'


const Auth = () => {
  const [email, setEmail] = useState("")
  const [password,setPassword]=useState("")
  const [error, setError] = useState("")
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  })
  const navigate = useNavigate()
  const navStateData = useLocation();
  console.log(navStateData)
  const authHandler =async(e) => {
    e.preventDefault();
    console.log(e.target.name)
    if (e.target.name == "signIn") {
    
      // firebase auth
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
       
        dispatch({
          type: Type.SET_USER,
          user:userInfo.user,
        })
        setLoading({ ...loading, signIn: false })
        navigate(navStateData?.state?.redirect || "/")
      }).catch((err) => {
       
        setError(err.message)
        setLoading({...loading,signIn:false})
      })

    } else {
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
       
        dispatch({
          type: Type.SET_USER,
          user:userInfo.user,
        })
        setLoading({ ...loading, signUp: false })
        navigate("/")
      }).catch((err) => {
        setError(err.message)
        setLoading({...loading,signUp:false})
      })
    }
  }



    return (
    <section className={classes.login}>
        <Link to='/'>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="" />
        </Link>
{/* form */}
        <div className={classes.login__container}>
          <h1>SignIn</h1>
          {navStateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: 'center',
                color: "red",
                fontWeight:"bold",
              }}
            >
              {navStateData?.state?.msg}
            </small>
          )

          }
          <form action=''>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type='email'
                id='email' />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type='password'
                id='password' />
            </div>
            <button
              type='submit'
              name='signIn'
              onClick={authHandler}
              className={classes.login__signInButton}>
              {loading.signIn ? (
                <ClipLoader color="#000" size="15px"></ClipLoader>) : (
                "SignIn")}</button>
          </form>
          {/* agreement */}
          <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
          </p>
          {/* create background btn */}
          <button
            type='submit'
            name='signUp'
            onClick={authHandler}
            className={classes.login__registerButton}
          >
            {loading.signUp ? (
                <ClipLoader color="#000" size="15px"></ClipLoader>) : (
                "create you amazon account")}
              {/* {loading.signUp ? (
                <ClipLoader color='#000' size="15px"></ClipLoader>) : (
                "create you amazon account"
              )
          } */}

          </button>
          {error && (
            <small style={{ paddingTop: "5px",color:"red" }} > { error }</small>)}
        </div>
    </section>
            
    
  )
}

export default Auth