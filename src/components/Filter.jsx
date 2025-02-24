import React, { useState } from "react";

const Filters = () => {
  const [homeType, setHomeType] = useState("");

  const [filters, setFilters] = useState({
    
    city:[],
    builder:[],
    community: [],
    // rentRange: [0, 10000000],
    // builtUpArea: [0, 100000],
    hometype: [],
    description:[],
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <div className="min-h-screen bg-[#e7eff7]">
   <header className="bg-[#001433] text-white p-4 justify-end items-center h-14 mb-4">       
  </header>
     
    <div className="w-80 p-9 bg-white shadow-lg rounded-lg overflow-auto ml-6">
      <h2 className="text-md font-semibold mb-4">Filters</h2>

      <div className="mb-4">
  <h3 className="font-semibold mb-2 text-xs text-gray-700">City</h3>
  <div className="grid grid-cols-2 gap-2 text-xs">
    {[
      "Hyderabad",  
    ].map((type) => (
      <label key={type} className="flex items-center">
        <input
          type="radio"
          onChange={() => handleCheckboxChange("city", type)}
          className="mr-2"
        />
        {type}
      </label>
    ))}
  </div>
  <hr className="mt-4 border-gray-300" />

</div> 

<div className="mb-4">
  <h2 className="font-semibold mb-2 text-xs text-gray-700">Builder</h2>
  <div className="grid grid-cols-2 gap-2 text-xs">
    {[
      "Myhome",
      "Myhouse",
      
    ].map((type) => (
      <label key={type} className="flex items-center">
        <input
          type="radio"
          name="builder"
          onChange={() => handleCheckboxChange("builder", type)}
          className="mr-2"
        />
        {type}
      </label>
    ))}
  </div>
  <hr className="mt-4 border-gray-300" />

</div>

     <div className="mb-4">
            <label className="font-semibold mb-2 text-xs text-gray-700">Community</label>
            <select
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs bg-white"
            >
              <option value="" className="hidden">Select Community</option>
              <option value="Apartment">Avatar</option>
              <option value="Villa">Krishne</option>
              <option value="Independent House">Vihanga</option>
            </select>
    </div>
    {/* <hr className="mt-4 mb-4 border-gray-300" /> */}


 {/* <div className="mb-4">
  <h3 className="font-semibold mb-2 text-xs text-gray-700">Community</h3>
  <div className="grid grid-cols-2 gap-2 text-xs">
    {[
      "Avtar",
      "Krishne",
      "Vihanga",
      "Tarkshya"
    ].map((type) => (
      <label key={type} className="flex items-center">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange("community", type)}
          className="mr-2"
        />
        {type}
      </label>
    ))}
  </div>
  <hr className="mt-4 border-gray-300" />
</div> */}

<div className="mb-4">
  <h3 className="font-semibold mb-2 text-xs text-gray-700">Bedrooms</h3>
  <div className="grid grid-cols-2 gap-2 text-sm">
    {[
      "2BHK",
      "3BHK",
      "4BHK",
      "5BHK"
    ].map((type) => (
      <label key={type} className="flex items-center text-xs">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange("hometype", type)}
          className="mr-2"
        />
        {type}
      </label>
    ))}
  </div>
  <hr className="mt-4 border-gray-300" />

</div>


      {/* <div className="mb-4">
        <h3 className="font-semibold">Rent Range: ₹ 0 to ₹ 1 Cr</h3>
        <input type="range" min="0" max="10000000" className="w-full" />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Built Up Area (sq. ft.): 0 to 1,00,000</h3>
        <input type="range" min="0" max="100000" className="w-full" />
      </div> */}

      <div className="mb-4">
        <h3 className="font-semibold text-xs mb-2 text-gray-700">Furnishing</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
        {["FullyFurnished", "SemiFurnished", "UnFurnished"].map((type) => (
          <label key={type} className="inline-flex items-center mr-2">
            <input
              type="checkbox"
              name="description"
              onChange={() => setFilters({ ...filters, description: type })}
              className="mr-2"
            />
            {type}
          </label>
        ))}
        </div>
        <hr className="mt-4 border-gray-300" />

      </div>

      

      {/* <div className="mb-4">
        <h3 className="font-semibold text-xs mb-2 text-gray-700">Availability</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
        {["Immediate", "Within 15 Days", "Within 30 Days", "After 30 Days"].map(
          (type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="availability"
                onChange={() => setFilters({ ...filters, availability: type })}
                className="mr-2"
              />
              {type}
            </label>
          )
        )}
        </div>
      </div> */}

      <div className="flex gap-8">
            <button className="bg-blue-600 text-white text-xs font-semibold px-9 py-1 rounded-lg hover:bg-blue-900">
              Clear
            </button>
            <button className="bg-blue-600 text-white text-xs font-semibold px-9 py-1 rounded-lg hover:bg-blue-700">
              Apply
            </button>
          </div>
    </div>
    </div>
  );
};

export default Filters;
