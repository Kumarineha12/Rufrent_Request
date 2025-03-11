
import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import tailwindStyles from './tailwindStyles'; // Import your Tailwind styles

const Photoshoot = () => {
  // State declarations
  const [isLoading, setIsLoading] = useState(true);
  const [serviceStatus, setServiceStatus] = useState("Available");
  const [appointmentBlocks, setAppointmentBlocks] = useState([
    { selectedDate: null, selectedTimeSlot: null },
    { selectedDate: null, selectedTimeSlot: null },
    { selectedDate: null, selectedTimeSlot: null },
  ]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [address, setAddress] = useState(""); // Initialize address as an empty string
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [calendarBlockIndex, setCalendarBlockIndex] = useState(null);

  // Fetch service details from the API inside the component.
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getServiceDetails?receipt_id=RRR-202503-004"
        );
        const data = await response.json();

        // Check if service with svc_id 3 exists.
        const isServiceFound = data.services.some(
          (service) => service.svc_id === 2
        );

        // Update service status based on whether the service is found.
        setServiceStatus(isServiceFound ? "Requested" : "Available");
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
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  // Utility to format a date in "DD-MMM-YYYY" (e.g., "09-Mar-2025")
  const formatDateForPayload = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, '0');
    const shortMonth = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${shortMonth}-${year}`;
  };

  // Set the selected time slot for a block.
  const handleTimeSlotSelectForBlock = (blockIndex, slot) => {
    setAppointmentBlocks(prevBlocks => {
      const updated = [...prevBlocks];
      updated[blockIndex].selectedTimeSlot = slot;
      return updated;
    });
  };

  // Remove the selected date from a block.
  const handleRemoveDate = (blockIndex) => {
    setAppointmentBlocks(prevBlocks => {
      const updated = [...prevBlocks];
      updated[blockIndex].selectedDate = null;
      return updated;
    });
  };

  // Remove the selected time slot from a block.
  const handleRemoveTimeSlot = (blockIndex) => {
    setAppointmentBlocks(prevBlocks => {
      const updated = [...prevBlocks];
      updated[blockIndex].selectedTimeSlot = null;
      return updated;
    });
  };

  // Form is valid if every block has a selected date, time slot, and address is not empty.
  const isFormValid =
    appointmentBlocks.every((block) => block.selectedDate && block.selectedTimeSlot) &&
    address; // Ensure address is not empty

  // Handle form submission: one appointment per block.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formatTimeSlot = (slot) => {
      if (slot === "slot1") return "Morning";
      if (slot === "slot2") return "Afternoon";
      if (slot === "slot3") return "Anytime";
      return "";
    };

    setScheduledAppointments(appointmentBlocks.map(block => ({
      date: block.selectedDate,
      timeSlot: block.selectedTimeSlot
    })));

    // Build svc_info object using formatDateForPayload.
    const svcInfo = {
      "First Slot Date": formatDateForPayload(appointmentBlocks[0]?.selectedDate),
      "First Slot Time": formatTimeSlot(appointmentBlocks[0]?.selectedTimeSlot),
      "Second Slot Date": formatDateForPayload(appointmentBlocks[1]?.selectedDate),
      "Second Slot Time": formatTimeSlot(appointmentBlocks[1]?.selectedTimeSlot),
      "Third Slot Date": formatDateForPayload(appointmentBlocks[2]?.selectedDate),
      "Third Slot Time": formatTimeSlot(appointmentBlocks[2]?.selectedTimeSlot),
      "Address": address // Include address in the payload
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
      serviced_slot: null
    };

    try {
      // POST the data to the API endpoint.
      const response = await axios.post("http://localhost:5000/api/claimservices", serviceData);
      console.log("Service Created:", response.data);
      // Update the service status to "Requested" after claiming.
      setServiceStatus("Requested");
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error creating service:", error.response?.data || error.message);
    }
  };

  // If the component is loading data, you can return a loading indicator.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`max-w-2xl mx-auto p-4 sm:p-6 ${tailwindStyles.whiteCard} rounded-lg shadow-lg relative`}>
      {/* Header with white background, black text, and a right-aligned status badge */}
     
{/* Header with white background, black text, and a responsive status badge */}
<div className="flex items-center justify-between px-3 py-4 rounded-t-lg flex-nowrap gap-1 sm:gap-3">
  {/* Icon + Title */}
  <div className="flex items-center min-w-0">
    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg shrink-0">
      <FontAwesomeIcon icon={faCamera} className="text-gray-600" />
    </div>
    <h2 className={`text-sm sm:text-lg font-semibold min-w-0 ${tailwindStyles.heading}`}>
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

      {!isConfirmed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Section */}
          <div className="flex flex-col sm:flex-row items-center bg-gray-50 p-3 sm:p-4 rounded-md">
            <label className={`text-md font-semibold mb-2 sm:mb-0 sm:mr-4 ${tailwindStyles.heading_3}`}>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="text-sm text-center sm:text-left text-gray-900 bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[70%]"
            />
          </div>

          {/* Table for Date and Time Slots */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-center font-semibold">Select Date</th>
                  <th className="px-2 py-2 text-center font-semibold">Slot1</th>
                  <th className="px-2 py-2 text-center font-semibold">Slot2</th>
                  <th className="px-2 py-2 text-center font-semibold">Slot3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointmentBlocks.map((block, index) => (
                  <tr key={index}>
                    {/* Date Selection */}
                    <td className="px-2 py-2">
                      <div
                        className="border border-gray-300 rounded-md p-2 flex items-center justify-between cursor-pointer"
                        onClick={() => setCalendarBlockIndex(index)}
                      >
                        <span className="text-sm">
                          {block.selectedDate ? formatDateForUI(block.selectedDate) : "No date selected"}
                        </span>
                        <span role="img" aria-label="calendar" className="text-xl">📅</span>
                      </div>
                      {block.selectedDate && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveDate(index);
                          }}
                          className="text-blue-400 hover:text-blue-600 text-xs mt-1"
                        >
                          Remove Date
                        </button>
                      )}
                    </td>

                    {/* Slot1 (Morning) */}
                    <td className="px-2 py-2 text-center">
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          id={`slot1-${index}`}
                          name={`slot-${index}`}
                          checked={block.selectedTimeSlot === "slot1"}
                          onChange={() => handleTimeSlotSelectForBlock(index, "slot1")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm">Morning</span>
                      </label>
                      {block.selectedTimeSlot === "slot1" && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeSlot(index)}
                          className="text-blue-400 hover:text-blue-600 text-xs mt-1"
                        >
                          Remove
                        </button>
                      )}
                    </td>

                    {/* Slot2 (Afternoon) */}
                    <td className="px-2 py-2 text-center">
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          id={`slot2-${index}`}
                          name={`slot-${index}`}
                          checked={block.selectedTimeSlot === "slot2"}
                          onChange={() => handleTimeSlotSelectForBlock(index, "slot2")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm">Afternoon</span>
                      </label>
                      {block.selectedTimeSlot === "slot2" && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeSlot(index)}
                          className="text-blue-400 hover:text-blue-600 text-xs mt-1"
                        >
                          Remove
                        </button>
                      )}
                    </td>

                    {/* Slot3 (Anytime) */}
                    <td className="px-2 py-2 text-center">
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          id={`slot3-${index}`}
                          name={`slot-${index}`}
                          checked={block.selectedTimeSlot === "slot3"}
                          onChange={() => handleTimeSlotSelectForBlock(index, "slot3")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm">Anytime</span>
                      </label>
                      {block.selectedTimeSlot === "slot3" && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeSlot(index)}
                          className="text-blue-400 hover:text-blue-600 text-xs mt-1"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Claim Now Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-md font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Claim Now
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="mb-6 bg-gray-50 p-4 rounded-md text-left max-h-64 overflow-y-auto">
            <p className="font-medium mb-2 text-md">
              You've scheduled {scheduledAppointments.length} appointment(s):
            </p>
            <ul className="space-y-2 text-sm">
              <li className="font-medium text-sm">Address: {address}</li>
              {scheduledAppointments.map(({ date, timeSlot }, index) => (
                <li
                  key={`${date}-${timeSlot}-${index}`}
                  className="border-b border-gray-100 pb-2 last:border-0"
                >
                  <span className="inline-block w-6 h-6 text-xs bg-blue-600 text-white rounded-full text-center leading-6 mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium">{formatDateForUI(date)}</span> at{' '}
                  <span>
                    {timeSlot === "slot1" ? "Morning" : timeSlot === "slot2" ? "Afternoon" : "Anytime"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {calendarBlockIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setCalendarBlockIndex(null)}></div>
          <div className="relative bg-white p-4 rounded shadow-lg z-10 w-full max-w-sm mx-4">
            <DayPicker
              mode="single"
              selected={appointmentBlocks[calendarBlockIndex].selectedDate}
              onSelect={(date) => {
                setAppointmentBlocks(prevBlocks => {
                  const updated = [...prevBlocks];
                  updated[calendarBlockIndex].selectedDate = date;
                  return updated;
                });
              }}
            />
            <button onClick={() => setCalendarBlockIndex(null)} className="mt-4 w-full py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition">Close Calendar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photoshoot;
