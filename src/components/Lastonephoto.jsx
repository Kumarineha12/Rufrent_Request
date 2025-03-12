// import React, { useState, useEffect } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import tailwindStyles from './tailwindStyles'; // Import your Tailwind styles

// const Photoshoot = () => {
//   // State declarations
//   const [isLoading, setIsLoading] = useState(true);
//   const [serviceStatus, setServiceStatus] = useState("Available");
//   const [appointments, setAppointments] = useState([]); // Array to store appointments (date + time)
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [address, setAddress] = useState("");
//   const [showCalendarModal, setShowCalendarModal] = useState(false);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null); // Temporary selected date
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Temporary selected time slot

//   // Fetch service details from the API inside the component.
//   useEffect(() => {
//     const fetchServiceDetails = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/getServiceDetails?receipt_id=RRR-202503-004"
//         );
//         const data = await response.json();

//         // Check if service with svc_id 2 exists.
//         const isServiceFound = data.services.some(
//           (service) => service.svc_id === 2
//         );

//         // Update service status based on whether the service is found.
//         setServiceStatus(isServiceFound ? "Requested" : "Available");

//         // If service is found, set isConfirmed to true and load the details from the database
//         if (isServiceFound) {
//           setIsConfirmed(true);
//           const PhotoDetails = data.services.find(
//             (service) => service.svc_id === 2
//           );
//           setServiceDetails(PhotoDetails);
//         }
//       } catch (error) {
//         console.error("Error fetching service details:", error);
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     };

//     fetchServiceDetails();
//   }, []);

//   // Utility to format a date for display in the UI
//   const formatDateForUI = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Utility to format a date in "DD-MMM-YYYY" (e.g., "09-Mar-2025")
//   const formatDateForPayload = (date) => {
//     if (!date) return "";
//     const day = String(date.getDate()).padStart(2, "0");
//     const shortMonth = date.toLocaleString("en-US", { month: "short" });
//     const year = date.getFullYear();
//     return `${day}-${shortMonth}-${year}`;
//   };

//   // Form is valid if three appointments and address are selected.
//   const isFormValid = appointments.length === 3 && address;

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid) return;

//     const formatTimeSlot = (slot) => {
//       if (slot === "slot1") return "Morning";
//       if (slot === "slot2") return "Afternoon";
//       if (slot === "slot3") return "Anytime";
//       return "";
//     };

//     // Build svc_info object in the required format
//     const svcInfo = {
//       "Address": address,
//       "First Slot Date": formatDateForPayload(appointments[0].date),
//       "First Slot Time": formatTimeSlot(appointments[0].timeSlot),
//       "Second Slot Date": formatDateForPayload(appointments[1].date),
//       "Second Slot Time": formatTimeSlot(appointments[1].timeSlot),
//       "Third Slot Date": formatDateForPayload(appointments[2].date),
//       "Third Slot Time": formatTimeSlot(appointments[2].timeSlot),
//     };

//     // Build final payload.
//     const serviceData = {
//       receipt_id: "RRR-202503-004",
//       svc_id: 2,
//       package_id: 1,
//       svc_info: JSON.stringify(svcInfo),
//       claimed_by: "SoCFwdFhMFgy428mPKgc7R5xXLs1",
//       claimer_cat: "tenant",
//       serviced_date: null,
//       serviced_slot: null,
//     };

//     try {
//       // POST the data to the API endpoint.
//       const response = await axios.post(
//         "http://localhost:5000/api/claimservices",
//         serviceData
//       );
//       console.log("Service Created:", response.data);

//       // Reload the page to reflect the changes
//       window.location.reload();
//     } catch (error) {
//       console.error(
//         "Error creating service:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Automatically add appointment when both date and time are selected
//   useEffect(() => {
//     if (selectedDate && selectedTimeSlot) {
//       setAppointments((prev) => [
//         ...prev,
//         { date: selectedDate, timeSlot: selectedTimeSlot },
//       ]);
//       // Do not reset selectedDate and selectedTimeSlot here
//     }
//   }, [selectedDate, selectedTimeSlot]);

//   // Reset selected date and time slot when modal is closed
//   useEffect(() => {
//     if (!showCalendarModal) {
//       setSelectedDate(null);
//       setSelectedTimeSlot(null);
//     }
//   }, [showCalendarModal]);

//   // If the component is loading data, return a loading indicator.
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const svcInfo = serviceDetails?.svc_info;
//   const parsedSvcInfo =
//     typeof svcInfo === "string" ? JSON.parse(svcInfo) : svcInfo;

//   return (
//     <div
//       className={`max-w-md mx-auto p-4 sm:p-6 ${tailwindStyles.whiteCard} rounded-lg shadow-lg relative`}
//     >
//       {/* Header with white background, black text, and a right-aligned status badge */}
//       <div className="flex items-center justify-between px-3 py-4 rounded-t-lg flex-nowrap gap-1 sm:gap-3">
//         {/* Icon + Title */}
//         <div className="flex items-center min-w-0">
//           <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg shrink-0">
//             <FontAwesomeIcon icon={faCamera} className="text-gray-600" />
//           </div>
//           <h2
//             className={`text-sm sm:text-lg font-semibold min-w-0 ${tailwindStyles.heading}`}
//           >
//             Photoshoot Appointment
//           </h2>
//         </div>

//         {/* Status Badge - Responsive Sizing */}
//         <span
//           className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 ${
//             serviceStatus === "Requested"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-green-100 text-green-800"
//           }`}
//         >
//           {serviceStatus}
//         </span>
//       </div>

//       {/* If the appointment is not confirmed (!isConfirmed), the form appears.
// Otherwise, a confirmation message is shown. */}
//       {!isConfirmed ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Address Section */}
//           <div className="flex flex-col sm:flex-row items-center bg-gray-50 p-3 sm:p-4 rounded-md">
//             <label
//               className={`text-md font-semibold mb-2 sm:mb-0 sm:mr-4 ${tailwindStyles.heading_3}`}
//             >
//               Address:
//             </label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your address"
//               className="text-sm text-center sm:text-left text-gray-900 bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[70%]"
//             />
//           </div>

//           {/* Single Input Box for Date and Time Selection */}
//           <div className="flex flex-col space-y-4">
//             <div
//               className="border border-gray-300 rounded-md p-2 flex items-center justify-between cursor-pointer"
//               onClick={() => setShowCalendarModal(true)}
//             >
//               <input
//                 type="text"
//                 value={
//                   appointments.length > 0
//                     ? appointments
//                         .map(
//                           (appointment, index) =>
//                             `${formatDateForUI(appointment.date)} (${
//                               appointment.timeSlot === "slot1"
//                                 ? "Morning"
//                                 : appointment.timeSlot === "slot2"
//                                 ? "Afternoon"
//                                 : "Anytime"
//                             })`
//                         )
//                         .join(", ")
//                     : "Select a date and time"
//                 }
//                 readOnly
//                 className="text-sm bg-transparent border-none focus:outline-none w-full"
//               />
//               <span role="img" aria-label="calendar" className="text-xl">
//                 📅
//               </span>
//             </div>
//           </div>

//           {/* Claim Now Button */}
//           <button
//             type="submit"
//             disabled={!isFormValid}
//             className={`w-full py-2 rounded-md font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
//               isFormValid
//                 ? "bg-blue-500 text-white hover:bg-blue-600"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Claim Now
//           </button>
//         </form>
//       ) : (
//         <div className="text-center">
//           <div className="mb-6 bg-gray-50 p-4 rounded-md text-left max-h-64 overflow-y-auto">
//             <p className="font-medium mb-2 text-md">
//               You've scheduled {parsedSvcInfo ? (Object.keys(parsedSvcInfo).length - 1) / 2 : 0} appointment(s):
//             </p>

//             <ul className="space-y-2 text-sm">
//               <li className="font-medium text-sm">
//                 Address: {parsedSvcInfo?.Address || ""}
//               </li>
//               {parsedSvcInfo &&
//                 Object.entries(parsedSvcInfo).map(
//                   ([key, value], index) =>
//                     key.includes("Date") && (
//                       <li
//                         key={index}
//                         className="border-b border-gray-100 pb-2 last:border-0"
//                       >
//                         <span className="inline-block w-6 h-6 text-xs bg-blue-600 text-white rounded-full text-center leading-6 mr-2">
//                           {(index + 1) / 2}
//                         </span>
//                         <span className="font-medium">
//                           {parsedSvcInfo[key]}
//                         </span>{" "}
//                         at{" "}
//                         <span>
//                           {parsedSvcInfo[key.replace("Date", "Time")]}
//                         </span>
//                       </li>
//                     )
//                 )}
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* Calendar and Time Slot Modal */}
//       {showCalendarModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black opacity-50"
//             onClick={() => setShowCalendarModal(false)}
//           ></div>
//           <div className="relative bg-white p-4 rounded shadow-lg z-10 w-full max-w-sm mx-4">
//             {/* Date Picker */}
//             <DayPicker
//               mode="single"
//               selected={selectedDate}
//               onSelect={(date) => {
//                 if (date) {
//                   setSelectedDate(date);
//                 }
//               }}
//             />

//             {/* Time Slot Selector (always visible) */}
//             <div className="mt-4">
//               <p className="text-sm font-medium mb-2">Select a Time Slot:</p>
//               <div className="flex flex-col space-y-2">
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     id="slot1"
//                     name="timeSlot"
//                     checked={selectedTimeSlot === "slot1"}
//                     onChange={() => setSelectedTimeSlot("slot1")}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   />
//                   <span className="ml-2 text-sm">Morning</span>
//                 </label>
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     id="slot2"
//                     name="timeSlot"
//                     checked={selectedTimeSlot === "slot2"}
//                     onChange={() => setSelectedTimeSlot("slot2")}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   />
//                   <span className="ml-2 text-sm">Afternoon</span>
//                 </label>
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     id="slot3"
//                     name="timeSlot"
//                     checked={selectedTimeSlot === "slot3"}
//                     onChange={() => setSelectedTimeSlot("slot3")}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                   />
//                   <span className="ml-2 text-sm">Anytime</span>
//                 </label>
//               </div>
//             </div>

//             {/* Close Button */}
//             <button
//               onClick={() => setShowCalendarModal(false)}
//               className="mt-4 w-full py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Photoshoot;








import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import tailwindStyles from './tailwindStyles'; // Import your Tailwind styles

const Photoshoot = () => {
  // State declarations
  const [isLoading, setIsLoading] = useState(true);
  const [serviceStatus, setServiceStatus] = useState("Available");
  const [appointments, setAppointments] = useState([]); // Array to store appointments (date + time)
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [address, setAddress] = useState("");
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Temporary selected date
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Temporary selected time slot

  // Fetch service details from the API inside the component.
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getServiceDetails?receipt_id=RRR-202503-004"
        );
        const data = await response.json();

        // Check if service with svc_id 2 exists.
        const isServiceFound = data.services.some(
          (service) => service.svc_id === 2
        );

        // Update service status based on whether the service is found.
        setServiceStatus(isServiceFound ? "Requested" : "Available");

        // If service is found, set isConfirmed to true and load the details from the database
        if (isServiceFound) {
          setIsConfirmed(true);
          const PhotoDetails = data.services.find(
            (service) => service.svc_id === 2
          );
          setServiceDetails(PhotoDetails);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchServiceDetails();
  }, []);

  // Utility to format a date for display in the UI
  const formatDateForUI = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Utility to format a date in "DD-MMM-YYYY" (e.g., "09-Mar-2025")
  const formatDateForPayload = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const shortMonth = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${shortMonth}-${year}`;
  };

  // Form is valid if three appointments and address are selected.
  const isFormValid = appointments.length === 3 && address;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formatTimeSlot = (slot) => {
      if (slot === "slot1") return "Morning";
      if (slot === "slot2") return "Afternoon";
      if (slot === "slot3") return "Anytime";
      return "";
    };

    // Build svc_info object in the required format
    const svcInfo = {
      "Address": address,
      "First Slot Date": formatDateForPayload(appointments[0].date),
      "First Slot Time": formatTimeSlot(appointments[0].timeSlot),
      "Second Slot Date": formatDateForPayload(appointments[1].date),
      "Second Slot Time": formatTimeSlot(appointments[1].timeSlot),
      "Third Slot Date": formatDateForPayload(appointments[2].date),
      "Third Slot Time": formatTimeSlot(appointments[2].timeSlot),
    };

    // Build final payload.
    const serviceData = {
      receipt_id: "RRR-202503-004",
      svc_id: 2,
      package_id: 1,
      svc_info: JSON.stringify(svcInfo),
      claimed_by: "SoCFwdFhMFgy428mPKgc7R5xXLs1",
      claimer_cat: "tenant",
      serviced_date: null,
      serviced_slot: null,
    };

    try {
      // POST the data to the API endpoint.
      const response = await axios.post(
        "http://localhost:5000/api/claimservices",
        serviceData
      );
      console.log("Service Created:", response.data);

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error(
        "Error creating service:",
        error.response?.data || error.message
      );
    }
  };

  // Automatically add appointment when both date and time are selected
  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      setAppointments((prev) => [
        ...prev,
        { date: selectedDate, timeSlot: selectedTimeSlot },
      ]);
      // Do not reset selectedDate and selectedTimeSlot here
    }
  }, [selectedDate, selectedTimeSlot]);

  // Reset selected date and time slot when modal is closed
  useEffect(() => {
    if (!showCalendarModal) {
      setSelectedDate(null);
      setSelectedTimeSlot(null);
    }
  }, [showCalendarModal]);

  // If the component is loading data, return a loading indicator.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const svcInfo = serviceDetails?.svc_info;
  const parsedSvcInfo =
    typeof svcInfo === "string" ? JSON.parse(svcInfo) : svcInfo;

  return (
    <div
      className={`max-w-md mx-auto p-4 sm:p-6 ${tailwindStyles.whiteCard} rounded-lg shadow-lg relative`}
    >
      {/* Header with white background, black text, and a right-aligned status badge */}
      <div className="flex items-center justify-between px-3 py-4 rounded-t-lg flex-nowrap gap-1 sm:gap-3">
        {/* Icon + Title */}
        <div className="flex items-center min-w-0">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg shrink-0">
            <FontAwesomeIcon icon={faCamera} className="text-gray-600" />
          </div>
          <h2
            className={`text-sm sm:text-lg font-semibold min-w-0 ${tailwindStyles.heading}`}
          >
            Photoshoot Appointment
          </h2>
        </div>

        {/* Status Badge - Responsive Sizing */}
        <span
          className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 ${
            serviceStatus === "Requested"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {serviceStatus}
        </span>
      </div>

      {/* If the appointment is not confirmed (!isConfirmed), the form appears.
Otherwise, a confirmation message is shown. */}
      {!isConfirmed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Section */}
          <div className="flex flex-col sm:flex-row items-center bg-gray-50 p-3 sm:p-4 rounded-md">
            <label
              className={`text-md font-semibold mb-2 sm:mb-0 sm:mr-4 ${tailwindStyles.heading_3}`}
            >
              Address:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="text-sm text-center sm:text-left text-gray-900 bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[70%]"
            />
          </div>

          {/* Single Input Box for Date and Time Selection */}
          <div className="flex flex-col space-y-4">
            <div
              className={`border border-gray-300 rounded-md p-2 flex items-center justify-between ${
                appointments.length === 3 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (appointments.length < 3) {
                  setShowCalendarModal(true);
                }
              }}
            >
              <input
                type="text"
                value={
                  appointments.length > 0
                    ? appointments
                        .map(
                          (appointment, index) =>
                            `${formatDateForUI(appointment.date)} (${
                              appointment.timeSlot === "slot1"
                                ? "Morning"
                                : appointment.timeSlot === "slot2"
                                ? "Afternoon"
                                : "Anytime"
                            })`
                        )
                        .join(", ")
                    : "Select a date and time"
                }
                readOnly
                className="text-sm bg-transparent border-none focus:outline-none w-full"
              />
              <span role="img" aria-label="calendar" className="text-xl">
                📅
              </span>
            </div>
          </div>

          {/* Claim Now Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-md font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Claim Now
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="mb-6 bg-gray-50 p-4 rounded-md text-left max-h-64 overflow-y-auto">
            <p className="font-medium mb-2 text-md">
              You've scheduled {parsedSvcInfo ? (Object.keys(parsedSvcInfo).length - 1) / 2 : 0} appointment(s):
            </p>

            <ul className="space-y-2 text-sm">
              <li className="font-medium text-sm">
                Address: {parsedSvcInfo?.Address || ""}
              </li>
              {parsedSvcInfo &&
                Object.entries(parsedSvcInfo).map(
                  ([key, value], index) =>
                    key.includes("Date") && (
                      <li
                        key={index}
                        className="border-b border-gray-100 pb-2 last:border-0"
                      >
                        <span className="inline-block w-6 h-6 text-xs bg-blue-600 text-white rounded-full text-center leading-6 mr-2">
                          {(index + 1) / 2}
                        </span>
                        <span className="font-medium">
                          {parsedSvcInfo[key]}
                        </span>{" "}
                        at{" "}
                        <span>
                          {parsedSvcInfo[key.replace("Date", "Time")]}
                        </span>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      )}

      {/* Calendar and Time Slot Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowCalendarModal(false)}
          ></div>
          <div className="relative bg-white p-4 rounded shadow-lg z-10 w-full max-w-sm mx-4">
            {/* Date Picker */}
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                }
              }}
            />

            {/* Time Slot Selector (always visible) */}
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Select a Time Slot:</p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="slot1"
                    name="timeSlot"
                    checked={selectedTimeSlot === "slot1"}
                    onChange={() => setSelectedTimeSlot("slot1")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm">Morning</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="slot2"
                    name="timeSlot"
                    checked={selectedTimeSlot === "slot2"}
                    onChange={() => setSelectedTimeSlot("slot2")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm">Afternoon</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="slot3"
                    name="timeSlot"
                    checked={selectedTimeSlot === "slot3"}
                    onChange={() => setSelectedTimeSlot("slot3")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm">Anytime</span>
                </label>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowCalendarModal(false)}
              className="mt-4 w-full py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photoshoot;

