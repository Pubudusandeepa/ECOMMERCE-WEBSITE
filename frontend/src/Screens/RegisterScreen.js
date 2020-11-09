import React ,{useEffect, useState}from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {register} from '../actions/userActions'


const RegisterScreen = (props) => {
 const [name, setName] = useState('') 
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('') 
 const userRegister = useSelector(state => state.userSignin)  
 const {loding, userInfo, error} = userRegister
 const dispatch = useDispatch()

const redirect = props.location.search ? props.location.search.split("=")[1]: '/'

  useEffect(() => {
     if(userInfo) {
         props.history.push(redirect)
     }
    return () => {
      //
    }
  }, [userInfo])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(register(name,email,password))
  }
  

    return <div className="forms">
       <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
           <h3>Register</h3>
         </li>
         <li>
          {loding && <div>Loading ..</div>}
          {error && <div>{error}</div>}
         </li>
         <li>
         <label htmlFor="email">
           Name
         </label>
         <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
         
        </li>
          <li>
           <label htmlFor="email">
             Email
           </label>
           <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
           
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </li>
          <li>
          <label htmlFor="repassword">Re-password</label>
          <input type="repassword" id="repassword" name="repassword" onChange={(e) => setPassword(e.target.value)} />
        </li>
          <li>
           <button type="submit" className="button primary">Register</button>
          </li>
          <li>
           Already have an account
          </li>
          <li>
           <Link to={redirect === "/"? "signin" : "signin?redirect"+ redirect} className="button secondary text-center">Signin</Link>
          </li>
        </ul>
       </form>
    </div>
      
    
}

export default RegisterScreen
