import React from "react";
import logo from "./greenlogo.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F4]">

      {/* Navbar */}
      {/* <nav className="bg-[#2CA4A4] text-white p-4 flex justify-between items-center max-w-9xl h-14"> */}

      <nav className="bg-[#0b3624] text-white p-4 flex justify-between items-center max-w-9xl h-14">
      {/* <nav className="bg-[#002e6e] text-white p-4 flex justify-between items-center max-w-9xl h-14"> */}

      {/* <nav className="bg-[#42a37d] text-white p-4 flex justify-between items-center max-w-9xl h-14"> */}

        <div className="flex items-center">
          <img src={logo} alt="Rufrent Logo" className="w-56" />
        </div>
        <div className="space-x-6">
          <a href="#" className="hover:text-green-400">Home</a>
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Why Choose</a>
        </div>
        <div className="space-x-4">
          <button className="bg-[#F4F4F4] px-4 py-1 rounded text-[#333333]">View Properties</button>
       

          <button className="bg-[#F4F4F4] px-4 py-1 rounded text-[#333333]">Post A Property</button>
          {/* <button className="bg-[#F4F4F4] px-4 py-1 rounded text-[#333333]">Login</button> */}
          <button>Login</button>

        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://www.gsa.gov/sites/gsa.gov/themes/custom/gsa/custom_assets/images/open_graph_image.jpeg')" }}
      >
        {/* <div className="bg-[#42a37d] bg-opacity-50 p-8 rounded-lg"> */}
        <div className="bg-[#0a3121] bg-opacity-50 p-8 rounded-lg">

          <h1 className="text-4xl font-bold">Find Your Perfect Rental Property</h1>
          <p className="mt-2">Explore a wide range of premium properties tailored just for you.</p>
          <div className="mt-4 flex gap-2">
            <select className="p-2 border rounded text-black">
              <option>Popular Communities</option>
            </select>
            <select className="p-2 border rounded text-black">
              <option>BHK</option>
            </select>
            <button className="bg-green-600 px-4 py-2 rounded">Search</button>
            {/* <button className="bg-[#F4F4F4] px-4 py-1 rounded text-[#333333]">Search</button> */}

          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="p-8 bg-white text-center">
        <h2 className="text-2xl font-bold">About Rufrent</h2>
        <p className="mt-2 max-w-2xl mx-auto">
          At Rufrent, we specialize in premium property management and rental services, ensuring a seamless experience for tenants and landlords alike.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
