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
    return ( <div>
      <section className="login">
         <div className="container">
            <form>
                <h1>Đăng nhập tại đây</h1>
                <div className="form-group">
                  <p>Email</p>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>
                <div className="form-group">
                  <p>Mật khẩu</p>
                  <input type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" id="exampleCheck1"></input>
                  <div className="save-forget">
                    <label className="form-check-label" htmlFor="exampleCheck1">Nhớ mật khẩu</label>
                    <a href="#">Quên mật khẩu ?</a>
                  </div>
                </div>
                <div className="btn-group">
                    <button type="submit" className="btn btn-dark">Đăng nhập</button>
                    <button type="submit" className="btn btn-warning">Đăng ký</button>
                    <button type="submit" className="btn btn-light">
                        <i className="bi bi-facebook"></i>
                        Sign in with Facebook
                    </button>
                </div>
            </form>
         </div>    
      </section>
    </div> )
 }


export default Login;