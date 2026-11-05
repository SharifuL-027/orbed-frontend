import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import AboutUs from '../About/AboutUs';
import Login from '../Admin/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />

      <Route path="/login" element ={<Login/>} />
  
    </Routes>
  )
}

export default AppRoutes;