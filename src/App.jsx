import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage/LandingPage';
import About from './pages/aboutpage/AboutPage';
import Navbar from './sections/navbar/Navbar';
import Footer from './sections/footer/Footer';
import HowToUse from './pages/howtousepage/HowToUse';
import Contact from './pages/contactus/Contact';
import Auth from './pages/Authentication/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import AdminRequests from './pages/admin/AdminRequests';
import AdminLogin from './pages/adminlogin/AdminLogin';
import NotFound from './pages/notfound/NotFound';
import Reports from './pages/reports/Reports';





function App() {
 

  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path='/howtouse' element={<HowToUse/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/googleadmin' element={<AdminRequests/>} />
          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path='*' element={<NotFound/>  } />
        </Routes>
      <Footer/>
      </BrowserRouter>
     
    </>
  )
}

export default App
