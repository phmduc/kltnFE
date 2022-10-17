import "./Login.css"
import $ from "jquery"
import { useEffect } from "react";
import { useState } from "react";
import { loginUser } from "../../Redux/apiRequests";
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {    
     const navigate = useNavigate()
     const [email, setEmail] = useState('')
     const [password, setPassword]= useState('')
     const [loginStatus, setLoginStatus]= useState('')
     const dispatch = useDispatch()
     useEffect(()=>{

     },[loginStatus])
     
     const  submitLogin = async (e)=>{
        e.preventDefault()
        const user = {
         email: email,
         password: password
        }
        const login = await loginUser(user,dispatch)
        if (typeof login === 'object'){
        setLoginStatus(login)
        navigate("/");
        }
        else{
        setLoginStatus(login)
        }
     }
     console.log(loginStatus)
    return ( <div>Code Here</div> )
 }


export default Login;