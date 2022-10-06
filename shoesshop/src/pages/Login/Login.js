import "./Login.scss"
import $ from "jquery"
import { useEffect } from "react";
import { useState } from "react";
import { loginUser } from "../../Redux/apiRequests";
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate } from "react-router-dom";


function Login() {
    $(function() {
        $(".input input").focus(function() {     
           $(this).parent(".input").each(function() {
              $("label", this).css({
                 "line-height": "18px",
                 "font-size": "18px",
                 "font-weight": "100",
                 "top": "0px"
              })
              $(".spin", this).css({
                 "width": "100%"
              })
           });
        }).blur(function() {
           $(".spin").css({
              "width": "0px"
           })
           if ($(this).val() == "") {
              $(this).parent(".input").each(function() {
                 $("label", this).css({
                    "line-height": "60px",
                    "font-size": "24px",
                    "font-weight": "300",
                    "top": "10px"
                 })
              });
     
           }
        });
     
        $(".button").click(function(e) {
           var pX = e.pageX,
              pY = e.pageY,
              oX = parseInt($(this).offset().left),
              oY = parseInt($(this).offset().top);
     
           $(this).append('<span className="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
           $('.x-' + oX + '.y-' + oY + '').animate({
              "width": "500px",
              "height": "500px",
              "top": "-250px",
              "left": "-250px",
     
           }, 600);
           $("button", this).addclassName('active');
        })
     
        $(".alt-2").click(function() {
           if (!$(this).hasclassName('material-button')) {
              $(".shape").css({
                 "width": "100%",
                 "height": "100%",
                 "transform": "rotate(0deg)"
              })
     
              setTimeout(function() {
                 $(".overbox").css({
                    "overflow": "initial"
                 })
              }, 600)
     
              $(this).animate({
                 "width": "140px",
                 "height": "140px"
              }, 500, function() {
                 $(".box").removeclassName("back");
     
                 $(this).removeclassName('active')
              });
     
              $(".overbox .title").fadeOut(300);
              $(".overbox .input").fadeOut(300);
              $(".overbox .button").fadeOut(300);
     
              $(".alt-2").addclassName('material-buton');
           }
     
        })
     
        $(".material-button").click(function() {
     
           if ($(this).hasclassName('material-button')) {
              setTimeout(function() {
                 $(".overbox").css({
                    "overflow": "hidden"
                 })
                 $(".box").addclassName("back");
              }, 200)
              $(this).addclassName('active').animate({
                 "width": "700px",
                 "height": "700px"
              });
     
              setTimeout(function() {
                 $(".shape").css({
                    "width": "50%",
                    "height": "50%",
                    "transform": "rotate(45deg)"
                 })
     
                 $(".overbox .title").fadeIn(300);
                 $(".overbox .input").fadeIn(300);
                 $(".overbox .button").fadeIn(300);
              }, 700)
     
              $(this).removeclassName('material-button');
     
           }
     
           if ($(".alt-2").hasclassName('material-buton')) {
              $(".alt-2").removeclassName('material-buton');
              $(".alt-2").addclassName('material-button');
           }
     
        });
     
     });
     
     
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
    return (<div className="materialContainer">
        <div className="box">
            <div className="title">LOGIN</div>
            <div className="input">
                <label htmlFor="name">Username</label>
                <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="name" id="name"></input>
                <span className="spin">{(typeof loginStatus === 'string') ? loginStatus : ''}</span>
            </div>
        
            <div className="input">
                <label htmlFor="pass">Password</label>
                <input type="password" value={password}  onChange={(e)=>{setPassword(e.target.value)}} name="pass" id="pass"></input>
                <span className="spin"></span>
            </div>
    
            <div className="button login">
                <button onClick={(e)=>{submitLogin(e)}}><span>GO</span> <i className="fa fa-check"></i></button>
            </div>
        
            <a href="" className="pass-forgot">Forgot your password?</a>
        
            </div>
            <div className="overbox">
        <div className="material-button alt-2"><span className="shape"></span></div>
    
        <div className="title">REGISTER</div>
    
        <div className="input">
            <label htmlFor="regname">Username</label>
            <input type="text" name="regname" id="regname"></input>
            <span className="spin"></span>
        </div>
    
        <div className="input">
            <label htmlFor="regpass">Password</label>
            <input type="password" name="regpass" id="regpass"></input>
            <span className="spin"></span>
        </div>
    
        <div className="input">
            <label htmlFor="reregpass">Repeat Password</label>
            <input type="password" name="reregpass" id="reregpass"></input>
            <span className="spin"></span>
        </div>
    
        <div className="button">
            <button><span>NEXT</span></button>
        </div>
    
    
        </div>
    </div> )
 }


export default Login;