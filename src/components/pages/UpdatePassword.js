import {useState} from 'react';
// import { useSearchParams } from 'react-router-dom';
const UpdatePassword = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("v")

    let [password,setPassword] = useState({
        password:"",cpassword:"",token:term
    });
    const handlePassword = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setPassword({...password,[name]:value});
    }
    const handleForm = async (e) =>{
        e.preventDefault();
        let res = await fetch('/update-password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(password)
        });

        let data = await res.json();
        console.log(data);
    }
  return (
      <>
        <form onSubmit={handleForm}>
            New Password:<input type="password" name="password" onChange={handlePassword}/>
            Confirm Password:<input type="password" name="cpassword" onChange={handlePassword}/>
            <div>
                <input type="submit" />
            </div>
        </form>
      </>
  );
};

export default UpdatePassword;
