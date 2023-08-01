import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {  Routes, Route } from "react-router-dom";
import Profile from './Components/Profile';
import Nopage from './Components/Nopage';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Body from './Components/Body';



function App() {
  return (
    <div className="App">
    <Navbar/>

    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/success" element={<Body/>} />



      <Route path="*" element={<Nopage />} />


  </Routes>
    </div>
  );
}

export default App;
