import "./index.css"
import { useState } from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

function Login() {
    const usenavigate = useNavigate()
    const [showPass,setshowPass] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [errorMsg,setErrorMsg] = useState("")

    const onShowPass = (e)=>{
        e.preventDefault()
        setshowPass(prev=> !prev)
    }
    const sendLoginDetails = async ()=>{
        const url2 = "https://mbs-todo-list-backend-1.onrender.com/login"
        const details = {
            username,password
        }
        const payload ={
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(details)
            
        } 
        const res = await fetch(url2,payload)
        const datas = await res.text()
        console.log(res.ok)
        console.log(datas)
        if(res.ok){  
            alert("Login Success")
            Cookies.set("jwt_token",datas,{expires:30})
          return  usenavigate("/")
        }else{
            alert(datas)
        }
    }
    const onLoginClick = (e) =>{
        e.preventDefault()
        if(username === ""){
            setError(true)
            setErrorMsg("Please Enter Valid Username")
        }else if(password === ""){
            setError(true)
            setErrorMsg("Please Enter Valid Password")
        }else{
            sendLoginDetails()
            setError(false)
            setErrorMsg("")
            setUsername("")
            setPassword("")
        }
    }

    const isTokenExist = Cookies.get("jwt_token")
    if(isTokenExist !== undefined){
        return <Navigate to="/" />
    }

    return ( <div className="login-page">
       <div className="login-card">
            <h1>Welcome back</h1>
            <p>Please enter your details,</p>
            <form className="form-container">
                <label htmlFor="username">Username</label>
                <input value={username} onChange={e=> setUsername(e.target.value)} id="username" type="text" placeholder="Enter your username" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={e=> setPassword(e.target.value)} type={showPass ? "text" : "password"} id="password" placeholder="Enter your password" />
                <button className="show-hide-btn" onClick={onShowPass}>{showPass ? "Hide Password" : "Show Password"}</button>
                {error && <p className="error-para">{errorMsg}</p>}
                <button onClick={onLoginClick} className="login-btn">Login</button>
            </form>
            <p>or</p>
            <p className="not-account">Don't have an account? <Link to="/register">Register</Link></p>
       </div>
    </div> );
}

export default Login;