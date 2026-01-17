import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage/LandingPage';
import About from './pages/aboutpage/AboutPage';
import Navbar from './sections/navbar/Navbar';
import Footer from './sections/footer/Footer';
import HowToUse from './pages/howtousepage/HowToUse';
import Contact from './pages/contactus/Contact';
import Auth from './pages/Authentication/Auth';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import AdminRequests from './pages/admin/AdminRequests';
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
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/googleadmin' element={<AdminRequests/>} />
          
          <Route path="/reports" element={<Reports/>} />
          <Route path='*' element={<NotFound/>  } />
        </Routes>
      <Footer/>
      </BrowserRouter>
     
    </>
  )
}

export default App
