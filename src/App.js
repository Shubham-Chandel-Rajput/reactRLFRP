import Register from './components/forms/register';
import Header from './components/Header/Header';
import Login from './components/forms/Login';
import Home from './components/pages/Home';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import ForgetPassword from './components/pages/ForgetPassword';
import UpdatePassword from './components/pages/UpdatePassword';
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element = {<Login/>} />
      <Route path="/dashboard" element = {<Dashboard/>} />
      <Route path="/forget-password" element = {<ForgetPassword/>}/>
      <Route path="/update-password" element = {<UpdatePassword/>}/>
    </Routes>

        {/* <Register/> */}
    </>
  );
}

export default App;
