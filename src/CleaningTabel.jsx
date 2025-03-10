import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';

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
  return `${day}-${shortMonth}-${year}`; // e.g. "09-Mar-2025"
};

const DeepCleaningConfirmation = () => {
  // Each block holds one selectedDate and one selectedTimeSlot.
  const [appointmentBlocks, setAppointmentBlocks] = useState([
    { selectedDate: null, selectedTimeSlot: null },
    { selectedDate: null, selectedTimeSlot: null },
    { selectedDate: null, selectedTimeSlot: null },
  ]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  // calendarBlockIndex tells us which block's date picker is open (null = closed)
  const [calendarBlockIndex, setCalendarBlockIndex] = useState(null);

  // Set the selected time slot for a block.
  // The slot value will be "slot1" or "slot2"
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

  // Form is valid if every block has a selected date and time slot.
  const isFormValid = appointmentBlocks.every(
    block => block.selectedDate && block.selectedTimeSlot
  );

  // Handle form submission: one appointment per block.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Create an array of appointments.
    // const appointments = appointmentBlocks.map(block => ({
    //   date: block.selectedDate,
    //   timeSlot: block.selectedTimeSlot
    // }));
    // setScheduledAppointments(appointments);

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
    
    // setScheduledAppointments(appointments);

    // Build svc_info object using formatDateForPayload to ensure correct date formatting.
    // const svcInfo = {
    //   "First Slot Date": formatDateForPayload(appointments[0]?.date),
    //   // "First Slot Time": appointments[0]?.timeSlot || "",
    //   "First Slot Time": formatSlotName(appointments[0]?.timeSlot),

    //   "Second Slot Date": formatDateForPayload(appointments[1]?.date),
    //   // "Second Slot Time": appointments[1]?.timeSlot || "",
    //   "Second Slot Time": formatSlotName(appointments[1]?.timeSlot),

    //   "Third Slot Date": formatDateForPayload(appointments[2]?.date),
    //   "Third Slot Time": formatSlotName(appointments[2]?.timeSlot)

    //   // "Third Slot Time": appointments[2]?.timeSlot || ""
    // };

    // Build svc_info object using formatDateForPayload to ensure correct date formatting.
  const svcInfo = {
    "First Slot Date": formatDateForPayload(appointmentBlocks[0]?.selectedDate),
    "First Slot Time": formatTimeSlot(appointmentBlocks[0]?.selectedTimeSlot),
    "Second Slot Date": formatDateForPayload(appointmentBlocks[1]?.selectedDate),
    "Second Slot Time": formatTimeSlot(appointmentBlocks[1]?.selectedTimeSlot),
    "Third Slot Date": formatDateForPayload(appointmentBlocks[2]?.selectedDate),
    "Third Slot Time": formatTimeSlot(appointmentBlocks[2]?.selectedTimeSlot),
  };

    // Build final payload
    const serviceData = {
      receipt_id: "RRR-202503-004",
      svc_id: 3,
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
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error creating service:", error.response?.data || error.message);
    }
  };

  // Reset all blocks to book more appointments.
  const handleBookAnother = () => {
    setAppointmentBlocks([
      { selectedDate: null, selectedTimeSlot: null },
      { selectedDate: null, selectedTimeSlot: null },
      { selectedDate: null, selectedTimeSlot: null },
    ]);
    setScheduledAppointments([]);
    setIsConfirmed(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg relative">  
      <div className="bg-[#001433] px-6 py-4 rounded-t-lg">
                <h2 className="text-xl text-center font-semibold text-[#FFC107]">Deep Cleaning Appointment</h2>
      </div>

      {!isConfirmed ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center font-semibold">Select Date</th>
                <th className="px-4 py-2 text-center font-semibold">Slot1</th>
                <th className="px-4 py-2 text-center font-semibold">Slot2</th>
                <th className="px-4 py-2 text-center font-semibold">Slot3</th>
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
                      <span role="img" aria-label="calendar" className="text-xl">
                        📅
                      </span>
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
                  <td className="px-4 py-2 text-center">
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
                  <td className="px-4 py-2 text-center">
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-1 px-2 rounded-md font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Schedule Appointments
          </button>
        </form>
      ) : (
        /* Confirmation Screen */
        <div className="text-center">
          <div className="mb-4 text-green-600">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-4">Appointments Scheduled!</h2>
          <div className="mb-6 bg-gray-50 p-4 rounded-md text-left max-h-64 overflow-y-auto">
            <p className="font-medium mb-2 text-md">
              You've scheduled {scheduledAppointments.length} appointment(s):
            </p>
            <ul className="space-y-2 text-sm">
              {scheduledAppointments.map(({ date, timeSlot }, index) => (
                <li
                  key={`${date}-${timeSlot}-${index}`}
                  className="border-b border-gray-100 pb-2 last:border-0"
                >
                  <span className="inline-block w-6 h-6 text-xs bg-blue-600 text-white rounded-full text-center leading-6 mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium">{formatDateForUI(date)}</span> at{' '}
                 <span>{timeSlot === "slot1" ? "Morning" : timeSlot === "slot2" ? "Afternoon" : "Anytime"}</span>

                  {/* <span>{timeSlot === "slot1" ? "Morning" : "Afternoon"}</span> */}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleBookAnother}
            className="w-full bg-blue-500 text-white py-1 px-2 font-semibold rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Schedule More Appointments
          </button>
        </div>
      )}

      {/* Modal Calendar */}
      {calendarBlockIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setCalendarBlockIndex(null)}
          ></div>
          {/* Modal content */}
          <div className="relative bg-white p-4 rounded shadow-lg z-10">
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
            <button
              onClick={() => setCalendarBlockIndex(null)}
              className="mt-4 w-full py-1 font-semibold  bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeepCleaningConfirmation;