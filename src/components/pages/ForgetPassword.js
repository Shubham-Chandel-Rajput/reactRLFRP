import {useState} from 'react';

const ForgetPassword = () => {
    let [res,setRes] = useState("");
    let [email,setEmail] = useState({
        email:""
    });
    const inputHandle = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setEmail({...email,[name]:value});
    }

    const checkEmail = async (e) =>{
        e.preventDefault();
        let res = await fetch('/forget-password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(email)
        });

        let data = await res.json();
        setRes(data.response);
    }

  return (
        <>
            <form onSubmit={checkEmail}>
                <div>
                    Email: <input type="email" name="email" onChange={inputHandle}/>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
            
            <p>{res}</p>
        </>
    );
};

export default ForgetPassword;
