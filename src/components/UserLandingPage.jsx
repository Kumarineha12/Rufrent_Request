import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Last = () => {
  const [city, setCity] = useState("Hyderabad");
  const [builder, setBuilder] = useState("");
  const [community, setCommunity] = useState("");
  const [homeType, setHomeType] = useState("");
  const [description, setDescription] = useState("");

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
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-[#0a1331] text-white p-4 flex justify-end items-center h-14 mb-6">
        <div className="space-x-4">
          <button className="bg-[#F4F4F4] px-4 py-1 rounded text-[#333333] text-sm">Post A Property</button>
          <button className="text-sm">My Listings</button>
          <button className="text-sm">My Favourites</button>
          <button className="text-sm">My Connections</button>
          <button className="text-sm">My Notifications</button>
          <button className="text-sm">Login</button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-10">
        <aside className="col-span-1 bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium mb-4">Filters</h2>
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
              placeholder="Enter builder"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Community</label>
            <input
              type="text"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              placeholder="Enter community"
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
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-900">
              Clear
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Apply
            </button>
          </div>
        </aside>

        {/* Property Cards with Carousel */}
        <main className="col-span-3 grid grid-cols-2 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="relative bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden"
            >
              {/* Swiper Carousel */}
              <Swiper
                pagination={{ clickable: true }}
                navigation={{
                  nextEl: `.swiper-button-next-${property.id}`,
                  prevEl: `.swiper-button-prev-${property.id}`,
                }}
                modules={[Pagination, Navigation]}
                className="w-full h-60 relative"
              >
                {property.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Property ${property.id} Image ${index + 1}`}
                      className="w-[95%] h-60 object-cover"
                    />
                  </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <button
                  className={`swiper-button-prev-${property.id} absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center z-10`}
                  style={{ fontSize: "25px" }}
                >
                  &#8249;
                </button>
                <button
                  className={`swiper-button-next-${property.id} absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center z-10`}
                  style={{ fontSize: "25px" }}
                >
                  &#8250;
                </button>
              </Swiper>

              {/* Details Card Below the Image */}
              <div className="w-[70%] mx-auto bg-white p-4 rounded-md shadow-md flex flex-col items-center text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{property.type}, {property.bedrooms}</p>
                <p className="text-sm text-gray-600 mb-1">{property.furnishing}</p>
                <p className="text-sm font-sm text-gray-800">Area: {property.area}</p>
              </div>

              {/* View Details Button */}
              <div className="p-4 flex justify-center mt-9">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>

              {/* <div className="p-9 flex justify-center mt-9">
               <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">  View Details </button>
              </div> */}
             
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Last;
