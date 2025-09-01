// export default function Hero() {
//   return (
//     <section className="bg-[var(--medical-white)] py-20">
//       <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        
//         {/* Left Content */}
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
//             AI-powered <span className="text-[var(--medical-red)]">Glioma Detection</span>
//           </h1>
//           <p className="mt-4 text-lg text-gray-600">
//             Upload MRI scans to detect brain tumors, predict survival rates, and analyze progression — all online.
//           </p>

//           <div className="mt-6 flex gap-4 justify-center md:justify-start">
//             <button className="bg-[var(--medical-red)] hover:bg-[var(--medical-red-dark)] text-white px-6 py-3 rounded-lg font-semibold transition">
//               Explore
//             </button>
//             <button className="border-2 border-[var(--medical-red)] text-[var(--medical-red)] hover:bg-[var(--medical-red)] hover:text-white px-6 py-3 rounded-lg font-semibold transition">
//               Compare
//             </button>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="flex-1 mt-10 md:mt-0">
//           <img 
//             src="/placeholder-medical.svg" 
//             alt="MRI Scan Illustration"
//             className="w-full max-w-md mx-auto"
//           />
//         </div>

//       </div>
//     </section>
//   );
// }














import React from 'react';
import HeroImg from '../../assets/images/Hero.jpg';
import { Link } from 'react-router-dom';


export default function Hero() {


  return (
    <section className="bg-[var(--medical-white)] py-20 my-5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            AI-powered <span className="text-[var(--medical-red)]">Glioma Detection</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Upload MRI scans to detect brain tumors, predict survival rates, and analyze progression — all online.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
           <Link to='/auth'><button
              // onClick={() => navigate("/auth")}
              className="bg-[var(--medical-red)] cursor-pointer hover:bg-[var(--medical-red-hover)] text-white px-6 py-3 rounded-lg font-semibold transition hover:scale-102"
            >
              Explore More
            </button></Link> 
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-10 md:mt-0 rounded-lg shadow-lg overflow-hidden ">
          <img 
            src={HeroImg} 
            alt="MRI Scan Illustration"
            className="w-full h-full  mx-auto rounded-lg shadow-lg "
          />
        </div>
        





      </div>
    </section>
  );
}
