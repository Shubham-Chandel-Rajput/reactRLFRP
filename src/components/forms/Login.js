import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import './Login.css';
const Login = () => {
    let [error,setError] = useState('');
    const navigate = useNavigate();
    let [loginCredentials,setLoginCrendentials] = useState({
        email:"",password:""
    });
    useEffect(()=>{
        let token = localStorage.getItem("user");
        if(token === ""){
            navigate('/login');
        }
    },[]);
    
    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setLoginCrendentials({...loginCredentials,[name]:value});

    }
    const handleLogin = async (e) =>{
        e.preventDefault();
        let {email,password} = loginCredentials;
        if(!email || !password){
            alert('Fill all the fields');
        }else{
            const res = await fetch('/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(loginCredentials)
            });
            let data = await res.json();
            if(data.response === 'login'){
                localStorage.setItem("user", data.data);
                navigate('/dashboard');
            }else if(data.response === "Invalid credentials"){
                setError(data.response);
                navigate('/login');
            }
        }

    }   
    return (
        <>
        <div className = "heading">
            <h1>Login</h1>
        </div>
        <div className="loginForm">
            <form onSubmit={handleLogin}>
                <div className="inputField">
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleInput} className="formInput"/>
                </div>
                <div className="inputField">
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleInput} className="formInput"/>
                </div>
                <div>
                    <Link to ="/forget-password">Forget Password</Link>
                </div>
                <div className="inputField">
                    <input type="submit" />
                </div>
            </form>
        </div>
            <div className = "renderError">
                <p className="error">{error}</p>
            </div>
        </>
    )
}

export default Login;