import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const navigate = useNavigate()
    
    const login=async()=>{
        if(!email || !password){
            setError(true)
        }else{
            //api integrating
            let result = await fetch("http://localhost:4501/login",{
                method:"post",
                body:JSON.stringify({email,password}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            result = await result.json()
            
            if(result.user){
                alert("you are logged in")
                localStorage.setItem("user",JSON.stringify(result.user))
                localStorage.setItem("token",JSON.stringify(result.token))
                navigate('/')
            }else{
                alert("Invalid User")
            }
        }
    }
    return(
        <div>
            <h1>Welcome Back!</h1>
            <form>

                <input className="input-box" type="text" placeholder="Enter Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                {error && !email && <span className="blank-input">Please Enter Email</span>}

                <input className="input-box" type="password" placeholder="Enter Your Password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                {error && !password && <span className="blank-input">Please Enter Password</span>}<br />

                <button type="button" className="btn" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;