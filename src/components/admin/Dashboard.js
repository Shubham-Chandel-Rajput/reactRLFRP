import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    let navigate = useNavigate();
    const [userData,setUserData] = useState({});

    let [response,setResponse] = useState("");

    let [password,setPassword] = useState({
        oldPassword:"",newPassword:"",confirmPassword:""
    });  
    
    const CallBack = async () =>{
        const res = await fetch('/dashboard',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });

        const data = await res.json();
        if(data.unAurthorize === "unAuthorized"){
            navigate('/login');
        }else if(data.data !== ''){
            setUserData(data.data);
        }
    }
    
    useEffect(()=>{
        let token = localStorage.getItem("user");
        if(token === ""){
            navigate('/login');
        }else{
        CallBack();
    }
    },[])

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setPassword({...password,[name]:value});
    }
    const submitPassword = async (e)=>{
        e.preventDefault();
        let res = await fetch('/change-password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(password)
        });

        let data = await res.json();
        if(data.response === "successfully changed"){
            navigate('/login');
        }
        setResponse(data.response);
    } 
  
  return (
      <>
      <h1>Dashboard</h1>
      <div>
      <p> Name : {userData.name}</p>
      <p> Email : {userData.email}</p>
      <p>{response}</p>
      <form onSubmit = {submitPassword}>
          <div>
            Old password:<input type="password" name='oldPassword' onChange={handleInput}/>
          </div>
          <div>
          New password:<input type="password" name='newPassword' onChange={handleInput}/>
          </div>
          <div>
          Confirm password:<input type="password" name='confirmPassword' onChange={handleInput}/>
          </div>
          <div>
              <input type="submit"/>
          </div>
      </form>
      </div>
      
      </>
  )
};

export default Dashboard;
