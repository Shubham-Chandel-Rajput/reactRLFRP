import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
const Header = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("user");
    const logout = async () =>{
        let res = await fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
            let data = await res.json();
           if(data.response === "user logout"){
            localStorage.removeItem("user");
               navigate('/login');
           }else if(data.unAurthorize === "unAurthorize"){
               navigate('/login');
           }else if(data.response === "error during logout"){
               navigate('/register');
           }
        
    }
    if(token !== null){
        return (
            <>
                <header>
                    <div className='container'>
                        <div className='logo'>
                            <h1>Shubham</h1>
                        </div>
                        <nav className='navbar'>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><a href="#" onClick={logout}>Logout</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </>
        )
    }else{
        return (
            <>
                <header>
                    <div className='container'>
                        <div className='logo'>
                            <h1>Shubham</h1>
                        </div>
                        <nav className='navbar'>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </>
        )
    }
    
};

export default Header;
