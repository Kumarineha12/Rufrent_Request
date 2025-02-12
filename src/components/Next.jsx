
import React, { useState,useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Eye } from "lucide-react";

const Last = () => {
  const [city, setCity] = useState("Hyderabad");
  const [builder, setBuilder] = useState("");
  const [community, setCommunity] = useState("");
  const [homeType, setHomeType] = useState("");
  const [description, setDescription] = useState("");
  const [hovered, setHovered] = useState(null);


  const properties = [
    {
      id: 1,
      name: "Krishe",
      type: "Villa",
      bedrooms: "2 BHK",
      furnishing: "Fully Furnished",
      area: "CUC",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqNyTySgrNMyqTNuPuzgg1mJy9Z4NwC-raQ&s?text=Image+1",
        "https://via.placeholder.com/400x250/00ced1/333333?text=Image+2",
        "https://via.placeholder.com/400x250/00ced1/333333?text=Image+3",
      ],
    },
    {
      id: 2,
      name: "Krishe",
      type: "Villa",
      bedrooms: "5 BHK",
      furnishing: "Fully Furnished",
      area: "CUC",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpKceLITr-RhRxVmwwcAN8aRy2tS9ExHHdw&s?text=Image+1",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+2",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+3",
      ],
    },
    {
      id: 3,
      name: "Krishe",
      type: "Villa",
      bedrooms: "5 BHK",
      furnishing: "Fully Furnished",
      area: "CUC",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpKceLITr-RhRxVmwwcAN8aRy2tS9ExHHdw&s?text=Image+1",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+2",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+3",
      ],
    },
    {
      id: 4,
      name: "Krishe",
      type: "Villa",
      bedrooms: "5 BHK",
      furnishing: "Fully Furnished",
      area: "CUC",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpKceLITr-RhRxVmwwcAN8aRy2tS9ExHHdw&s?text=Image+1",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+2",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+3",
      ],
    },
    {
      id: 5,
      name: "Krishe",
      type: "Villa",
      bedrooms: "5 BHK",
      furnishing: "Fully Furnished",
      area: "CUC",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpKceLITr-RhRxVmwwcAN8aRy2tS9ExHHdw&s?text=Image+1",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+2",
        "https://via.placeholder.com/400x250/d2691e/333333?text=Image+3",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#e7eff7]">
    {/* Navbar */}
      <header className="bg-[#001433] text-white p-4 flex justify-end items-center h-14 mb-6">
        <div className="space-x-4">
          <button className="bg-blue-600 px-4 py-1 rounded text-white text-sm">Post A Property</button>
          {/* <button className="bg-[#F4F4F4] px-4 py-1 rounded text-[#333333] text-sm">Post A Property</button> */}
          <button className="text-sm">My Listings</button>
          <button className="text-sm">My Favourites</button>
          <button className="text-sm">My Connections</button>
          <button className="text-sm">Notifications</button>
          <button className="bg-blue-600 px-4 py-1 rounded text-white text-sm">Login</button>
        </div>
      </header>

             {/* filters sidebar */}

      <div className="grid grid-cols-4 gap-10">
        <aside className="col-span-1 bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-md font-medium mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Select city"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Builder</label>
            <input
              type="text"
              value={builder}
              onChange={(e) => setBuilder(e.target.value)}
              placeholder="Select builder"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Community</label>
            <input
              type="text"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              placeholder="Select community"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Home Type</label>
            <select
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="">Select home type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Select description"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-900">
              Clear
            </button>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
              Apply
            </button>
          </div>
        </aside>

        {/* Property Cards with Carousel */}
        <main className="col-span-3 grid grid-cols-2 gap-6 w-[96%]">
        {properties.map((property) => {
          const swiperRef = useRef(null);
          return (
            <div
              key={property.id}
              className="relative bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden p-2"
            >
              <Swiper
                pagination={{ clickable: true }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Pagination, Navigation]}
                className="w-[90%] h-30 relative"
              >
                {property.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <img
                        src={image}
                        alt={`Property ${property.id} Image ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      {/* Custom Navigation Buttons */}
                      {index > 0 && (
                        <button
                          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center z-10"
                          style={{ fontSize: "25px" }}
                          onClick={() => swiperRef.current.slidePrev()}
                        >
                          &#8249;
                        </button>
                      )}
                      {index < property.images.length - 1 && (
                        <button
                          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center z-10"
                          style={{ fontSize: "25px" }}
                          onClick={() => swiperRef.current.slideNext()}
                        >
                          &#8250;
                        </button>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

               {/* Details Card Below the Image */}
            <div className="p-2 flex justify-between">
               <div >
                <h3 className="text-lg font-semibold text-gray-800 pl-4">{property.name}, {property.type}</h3>
                <p className="text-sm text-gray-600 mb-1 pl-4">{property.bedrooms}, {property.furnishing}, Area: {property.area}</p>
                </div>

              {/* View Details Button */}
                {/* <button className=" text-blue-600 text-sm px-2 py-2 rounded-lg pr-3">
                    <Eye className="w-10 h-10" />
                </button> */}

               <button className="relative flex items-center text-blue-600 text-sm p-2 rounded-lg group pr-3">
               <Eye className="w-10 h-10" />
               <span className="absolute bottom-full left-0 transform -translate-x-1/2 -mb-4 font-semibold text-xs rounded px-2 py-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pl-8">
                View Details
              </span>
            </button>
              </div>
            </div>
           );
         })}       
        </main>
      </div>
    </div>
  );
};

export default Last;
