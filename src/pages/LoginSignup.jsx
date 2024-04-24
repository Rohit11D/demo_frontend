import React from "react";
import { useState } from "react";
import "./CSS/LoginSignup.css";
const Api_URL = "https://e-commerce-full-stack-1.onrender.com";

const LoginSignup = () =>{
    const [state,setState] = useState("Sign Up");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:""
    });
    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const login = async ()=>{
        //  console.log("login xe",formData);
         let responseData;
        await fetch(Api_URL+`/login`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
                 },
                 body:JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData=data);
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }
    const signup = async ()=>{
        // console.log("signup xe",formData);
        let responseData;
        await fetch(Api_URL+`/signup`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
                 },
                 body:JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData=data);
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }
    return (

       <div className="ls-back">
        <div class="_8esl"><div class="_8ice"><img class="fb_logo" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook"/></div><h2 class="_8eso">Facebook helps you connect and share with the people in your life.</h2></div>
        < div >
       <div className="login_signup">

 <h2>{state}</h2>
 <div className="credentials">
  {/* {state==="Sign Up"?<input name="username"value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>} */}
  <input  name="email"value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
  <input  name="password"value={formData.password} onChange={changeHandler} type="password" placeholder="Email Password" />

 </div>
 <div>
    <button onClick={()=>{state==="Login"?login():signup()}} className="continue-btn">Continue</button>
 </div>

 {state==="Sign Up"?<div className="login">
 <p>Already have an account ?</p>
 <span onClick={()=>{setState("Login")}} >Login here</span>
 </div>:<div className="login">
 <p>Create an account ?</p>
 <span onClick={()=>{setState("Sign Up")}}>Sign Up</span>
 </div>}
 
 

 {/* <div className="checkboxTerms">
 <input type="checkbox" name="" id="" />
 <p>By continuing, i agree to the terms of use & privacy policy.</p>
 </div> */}
        </div>
        </div>
        </div>
    )
}

export default LoginSignup;