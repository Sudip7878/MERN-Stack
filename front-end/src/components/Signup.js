import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    
    const signup = async () => {
        if (!name || !email || !password) {
            setError(true)
        } else {
            let result = await fetch('http://localhost:4501/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            localStorage.setItem("user", JSON.stringify(result.result))
            localStorage.setItem("token", JSON.stringify(result.token))
            navigate('/')
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form>
                <input className="input-box" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                {error && !name && <span className="blank-input">Please Enter Name</span>}

                <input className="input-box" type="text" placeholder="Enter Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                {error && !email && <span className="blank-input">Please Enter Price</span>}

                <input className="input-box" type="password" placeholder="Enter Your Password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                {error && !password && <span className="blank-input">Please Enter Password</span>}<br />

                <button type="button" className="btn" onClick={signup}>Signup</button>
            </form>
        </div>
    )
}

export default Signup;