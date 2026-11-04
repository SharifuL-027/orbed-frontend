import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import AboutUs from '../About/AboutUs';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
  
    </Routes>
  )
}

export default AppRoutes;