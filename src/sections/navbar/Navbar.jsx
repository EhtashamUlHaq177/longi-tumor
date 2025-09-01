// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */}
//           <div className="flex-shrink-0 text-xl font-bold text-primary">
//             LongiTumorSense
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center">
//             <a href="#home" className="text-gray-700 hover:text-primary">Home</a>
//             <a href="#about" className="text-gray-700 hover:text-primary">About</a>
//             <a href="#howto" className="text-gray-700 hover:text-primary">How to Use</a>
//             <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
//             <Button variant="default" className="bg-primary text-white hover:bg-primary/90">Login</Button>
//             <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Sign Up</Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-sm px-4 pb-4 space-y-2">
//           <a href="#home" className="block text-gray-700 hover:text-primary">Home</a>
//           <a href="#about" className="block text-gray-700 hover:text-primary">About</a>
//           <a href="#howto" className="block text-gray-700 hover:text-primary">How to Use</a>
//           <a href="#contact" className="block text-gray-700 hover:text-primary">Contact</a>
//           <Button variant="default" className="w-full bg-primary text-white hover:bg-primary/90">Login</Button>
//           <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">Sign Up</Button>
//         </div>
//       )}
//     </nav>
//   );
// }
































import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import NavLogo from "../../assets/images/navLogo.png"; 
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handlenavClick = () => {
    setIsOpen(false);}

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
         <Link to='/auth'>    <Button variant="outline" className="border-white  hover:bg-white hover:text-primary  cursor-pointer">Login</Button></Link>
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
        <Link to='/auth'>  <Button variant="outline" className="w-full border-white hover:bg-white hover:text-primary" onClick={handlenavClick}>Login</Button></Link>
        </div>
      )}
    </nav>
  );
}
