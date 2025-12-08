import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import NavLogo from "../../assets/images/navLogo.png";
import { useLocation } from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authType, setAuthType] = useState(null);
  const [userName, setUserName] = useState("");

  const location = useLocation();
  const isLanding = location.pathname === "/";

  const navigate = useNavigate();


  useEffect(() => {
    setAuthType(localStorage.getItem("authType"));
    setUserName(localStorage.getItem("userName") || "");

  }, []);
  // Optional: Listen for storage changes (multi-tab support)
  useEffect(() => {
    const handler = () => {
      setAuthType(localStorage.getItem("authType"));
      setUserName(localStorage.getItem("userName") || "");
    }

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handlenavClick = () => {
    setIsOpen(false);
  }

  return (
    <nav className="bg-[var(--medical-red)] fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-white">
            <img src={NavLogo} alt="Logo" className="w-8 h-8 inline-block mr-2" />
            LongiTumorSense
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to='/'>      <p className="text-white hover:text-gray-200">Home</p></Link>
            <Link to='/about'>    <p className="text-white hover:text-gray-200">About</p></Link>
            <Link to='/howtouse'>     <p className="text-white hover:text-gray-200">How to Use</p></Link>
            <Link to='/contact'>     <p className="text-white hover:text-gray-200">Contact</p>  </Link>
            {/* <Link to='login'>      <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 cursor-pointer">Login</Button></Link> */}


            {/* <Link to='/auth'>    <Button variant="outline" className="border-white  hover:bg-white hover:text-primary  cursor-pointer">Login</Button></Link> */}




            {/* {authType === "user" && (
          <span className="flex items-center gap-2 text-black font-semibold">
            <span role="img" aria-label="user">👤</span> User
          </span>
        )}  

        {authType === "admin" && (
          <span className="flex items-center gap-2 text-black font-semibold">
            <span role="img" aria-label="admin">👨‍⚕️</span> Admin
          </span>
        )}
        
        {!authType && (
          <Link to='/auth'>
            <Button variant="outline" className="w-full border-white hover:bg-white hover:text-primary" onClick={handlenavClick}>Login</Button>
          </Link>
        )} */}


            {/* Always show Login button on landing page */}
            {isLanding ? (
              <Link to='/auth'>
                <Button className="cursor-pointer bg-[#d61e1e] hover:bg-[rgb(214,30,50)]" >Login</Button>
              </Link>
            ) : (
              <>

                {authType === "user" && userName && (
                  <span className="flex items-center gap-2 font-semibold text-gray-700">
                    <span role="img" aria-label="user">👤</span> {userName}
                  </span>
                )}
                {authType === "admin" && (
                  <span className="flex items-center gap-2 font-semibold text-gray-700">
                    <span role="img" aria-label="admin">👨‍⚕️</span> Admin
                  </span>
                )}
                {!authType && !isLanding && (
                  <Link to='/auth'>
                    <Button className="cursor-pointer bg-[#d61e1e] hover:bg-[rgb(214,30,50)]">Login</Button>
                  </Link>
                )}
              </>
            )}


          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link to='/'>   <p className="block text-black border-b-2 hover:text-gray-200" onClick={handlenavClick}>Home</p></Link>
          <Link to='/about'> <p className="block text-black border-b-2 hover:text-gray-200" onClick={handlenavClick}>About</p> </Link>
          <Link to='/howtouse'>  <p className="block text-black border-b-2 hover:text-gray-200" onClick={handlenavClick}>How to Use</p></Link>
          <Link to='/contact'> <p className="block text-black border-b-2 hover:text-gray-200" onClick={handlenavClick}>Contact</p></Link>
          {/* <Link to='login'>  <Button variant="secondary" className="w-full bg-white text-primary hover:bg-gray-100">Login</Button></Link> */}
          {/* <Link to='/auth'>  <Button variant="outline" className="w-full border-white hover:bg-white hover:text-primary" onClick={handlenavClick}>Login</Button></Link> */}

          {isLanding ? (
            <Link to='/auth'>
              <Button variant="outline" className="w-full border-white hover:bg-white hover:text-primary " onClick={handlenavClick}>Login</Button>
            </Link>
          ) : (
            <>
              {authType === "user" && userName && (
                <span className="flex items-center gap-2 font-semibold text-gray-700">
                  <span role="img" aria-label="user">👤</span> {userName}
                </span>
              )}
              {authType === "admin" && (
                <span className="flex items-center gap-2 font-semibold text-gray-700">
                  <span role="img" aria-label="admin">👨‍⚕️</span> Admin
                </span>
              )}
              {!authType && (
                <Link to='/auth'>
                  <Button variant="outline" className="w-full  border-white hover:bg-white hover:text-primary " onClick={handlenavClick}>Login</Button>
                </Link>
              )}
            </>
          )}

        </div>
      )}




    </nav>
  );
}
