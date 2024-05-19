import "./index.css"
import { Link,Navigate,useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

function Register(prop) {
    const usenavigate = useNavigate()
    const [showPassword,setshowPassword] = useState(false)
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [iserror,setisError] = useState(false)
 
    const onShowingPass = (e)=>{
        e.preventDefault()
        if(password !== ""){
            setshowPassword(prev=> !prev)
        }
    }

    const sendRegisterData = async ()=>{
        const url = "http://localhost:4000/register"
        const details = {
            name,username,password
        }
        const payload ={
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(details)
            
        } 
        const res = await fetch(url,payload)
        if(res.status === 200){
            const datas = await res.text()
            alert(datas)
            usenavigate("/login")
        }else{
            const datas = await res.text()
            alert(datas)
        }
    }

    const onRegister = (e)=>{
        e.preventDefault()
        if(name === ""){
            setisError(true)
            setError("Please Enter Valid Name")
        }else if(username === ""){
            setisError(true)
            setError("Please Enter Valid Username")
        }else if(password === ""){
            setisError(true)
            setError("Please Enter Valid Password")
        }else{
            sendRegisterData()
            setisError(false)
            setError("")
            setName("")
            setUsername("")
            setPassword("")
        }
    }

    const tokenExist = Cookies.get("jwt_token")

    if(tokenExist !== undefined){
        return <Navigate to="/" />
    }

    return (<>
     <div className="register-page">
        <div className="register-card">
            <h1>Welcome back</h1>
            <p>Please enter your details,</p>
            <form className="register-form">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e=> setName(e.target.value)} id="name" type="text" placeholder="Enter your name" />
                <label htmlFor="username">Username</label>
                <input value={username} onChange={e=> setUsername(e.target.value)} id="username" type="text" placeholder="Enter your username" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={e=> setPassword(e.target.value)} type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" /> 
                <button className="show-hide-button" onClick={onShowingPass} >{showPassword ? "Hide Password" : "Show Password"}</button>
                {iserror && <p className="error-msg">{error}</p>}
                <button onClick={onRegister} className="register-btn">Register Now</button>
            </form>
            <p>or</p>
            <p className="already-account">Already have an account? <Link to="/login">Login</Link></p>
       </div>
    </div> 
    </>
    );
}

export default Register;