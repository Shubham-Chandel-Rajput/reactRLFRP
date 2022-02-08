import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () =>{
    const navigate = useNavigate();
    const [input,setInput] = useState({
       name:"", email:"",password:"",cpassword:"",role:"user"
    });
    useEffect(()=>{
        let token = localStorage.getItem("user");
        if(token === ""){
            navigate('/register');
        }
    },[]);
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        setInput({...input,[name]:value});
    }
    const formSubmission = async (e) =>{
        e.preventDefault();
        let {name,email,password,cpassword} = input;
        if(!name || !email || !password || !cpassword){
            alert("Fill all the fields");
        }
        else if(password !== cpassword){
            alert('Passwords are not matching');
        }else{
            let res = await fetch('/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(input)
            });
            
            const data = await res.json();
            if(data.response === "register"){
                navigate('/login');
            }
        }
    }

    return(
        <>
        <div className="heading">
            <h1>Register</h1>
        </div>
            <div className="registerForm">
                <form onSubmit={formSubmission} encType="multipart/form-data">
                <div>
                        <label>Name:</label>
                        <input type = "text" name="name" onChange={handleInput} className="formInput"/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type = "email" name="email" onChange={handleInput} className="formInput"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type = "password" name="password" onChange={handleInput} className="formInput"/>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type = "password" name="cpassword" onChange={handleInput} className="formInput"/>
                    </div>
                    
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;