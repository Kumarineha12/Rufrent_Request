import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';

const Photoshoot = () => {
  // Each block now holds a single selectedDate and a single selectedTimeSlot.
  const [appointmentBlocks, setAppointmentBlocks] = useState([//emporary selections (before submission).
    { selectedDate: null, selectedTimeSlot: null },
    { selectedDate: null, selectedTimeSlot: null },
    { selectedDate: null, selectedTimeSlot: null },
  ]);
  const [isConfirmed, setIsConfirmed] = useState(false);//true after successful submission
  const [scheduledAppointments, setScheduledAppointments] = useState([]);//Stores confirmed appointments (after submission).
  // calendarBlockIndex tells us which block's date picker is open (null = closed)
  const [calendarBlockIndex, setCalendarBlockIndex] = useState(null);

  // Two available time slots.
  const timeSlots = ['Morning', 'Afternoon'];

  // Format a date for display.
  const formatDate = (date) => {
    if (!date) return "No Date"; // Handle null or undefined values safely
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, '-');
  };


  // Set the selected time slot for a block.
  const handleTimeSlotSelectForBlock = (blockIndex, slot) => {
    setAppointmentBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      newBlocks[blockIndex].selectedTimeSlot = slot;
      return newBlocks;
    });
  };

  // Remove the selected date from a block.
  const handleRemoveDate = (blockIndex) => {
    setAppointmentBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      newBlocks[blockIndex].selectedDate = null;
      return newBlocks;
    });
  };

  // Remove the selected time slot from a block.
  const handleRemoveTimeSlot = (blockIndex) => {
    setAppointmentBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      newBlocks[blockIndex].selectedTimeSlot = null;
      return newBlocks;
    });
  };

  // Handle form submission: one appointment per block.

 const handleSubmit = (e) => {
    e.preventDefault();

    const validAppointments = appointmentBlocks.filter(
      (block) => block.selectedDate && block.selectedTimeSlot
    );

    if (validAppointments.length !== 3) {
      alert("Please select date and time slot for all appointments.");
      return;
    }

    const serviceData = {
      // receipt_id: "RRR-202503-004",
      svc_id: 2,
      // package_id: 1,
      svc_info: JSON.stringify({
        "First Slot Date": formatDate(validAppointments[0].selectedDate),
        "First Slot Time": validAppointments[0].selectedTimeSlot,
        "Second Slot Date": formatDate(validAppointments[1].selectedDate),
        "Second Slot Time": validAppointments[1].selectedTimeSlot,
        "Third Slot Date": formatDate(validAppointments[2].selectedDate),
        "Third Slot Time": validAppointments[2].selectedTimeSlot,
      }),
      // claimed_by: "SoCFwdFhMFgy428mPKgc7R5xXLs1",
      // claimer_cat: "tenant",
      // serviced_date: null,
      // serviced_slot: null,
    };

    axios.post("http://localhost:5000/api/claimservices", serviceData)
    .then(response => {
      console.log("Service Created:", response.data);
      // Store the appointments with the Date object
      setScheduledAppointments(validAppointments.map(appointment => ({
        date: appointment.selectedDate,
        timeSlot: appointment.selectedTimeSlot
      })));
      setIsConfirmed(true);
    })
    .catch(error => console.error("Error:", error));
  };



  // Reset all blocks to book more appointments.
  const handleBookAnother = () => {
    setAppointmentBlocks([
      { selectedDate: null, selectedTimeSlot: null },
      { selectedDate: null, selectedTimeSlot: null },
      { selectedDate: null, selectedTimeSlot: null },
    ]);
    setIsConfirmed(false);
  };

  // Helper to display the selected date text.
  const getSelectedDateText = (date) => {
    return date ? formatDate(date) : "No date selected";
  };

  // Form is valid if every block has a selected date and time slot.
  const isFormValid = appointmentBlocks.every(
    block => block.selectedDate && block.selectedTimeSlot
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg relative border-2">
      <h1 className="text-2xl font-bold text-center mb-6 ">
        Photoshoot Appointment
      </h1>

      {!isConfirmed ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            {appointmentBlocks.map((block, index) => (
              <div key={index} className="border-2 border-gray-300 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Appointment {index + 1}</h2>
                <div className="flex gap-6">
                  {/* Select Date */}
                  <div className="flex-1">
                    <label className="block text-md font-medium text-gray-800 mb-1">
                      Select Date
                    </label>
                    <p className="text-sm text-gray-500 mb-1">
                      Choose a date for photoshoot.
                    </p>
                    <div
                      className="border border-gray-300 rounded-md p-3 flex items-center justify-between cursor-pointer"
                      onClick={() => setCalendarBlockIndex(index)}
                    >
                      <span className="text-sm font-medium">
                        {getSelectedDateText(block.selectedDate)}
                      </span>
                      <span role="img" aria-label="calendar" className="text-2xl">
                        📅
                      </span>
                    </div>
                    {!block.selectedDate && (
                      <p className="text-red-500 text-xs mt-1">Please select a date</p>
                    )}
                    {block.selectedDate && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded flex items-center">
                          {formatDate(block.selectedDate)}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveDate(index);
                            }}
                            className="ml-1 text-blue-400 hover:text-blue-600"
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Select Time Slot with radio buttons */}
                  <div className="flex-1">
                    <label className="block text-md font-medium text-gray-800 mb-1">
                      Select Time Slot
                    </label>
                    <p className="text-sm text-gray-500 mb-1">
                      Choose a time slot.
                    </p>
                    <div className="border border-gray-300 rounded p-3">
                      {timeSlots.map(slot => (
                        <div key={slot} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded">
                          <input
                            type="radio"
                            id={`time-${slot}-${index}`}
                            name={`time-slot-${index}`}
                            checked={block.selectedTimeSlot === slot}
                            onChange={() => handleTimeSlotSelectForBlock(index, slot)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            htmlFor={`time-${slot}-${index}`}
                            className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer w-full"
                          >
                            {slot}
                          </label>
                        </div>
                      ))}
                    </div>
                    {!block.selectedTimeSlot && (
                      <p className="text-red-500 text-xs mt-1">Please select a time slot</p>
                    )}
                    {block.selectedTimeSlot && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded flex items-center">
                          {block.selectedTimeSlot}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTimeSlot(index);
                            }}
                            className="ml-1 text-blue-400 hover:text-blue-600"
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}//Disabled if the form is incomplete.

            className={`w-full py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Schedule Appointments
          </button>
        </form>
      ) : (
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
            <p className="font-medium mb-2">
              You've scheduled {scheduledAppointments.length} appointment(s):
            </p>
            <ul className="space-y-2">
              {scheduledAppointments.map(({ date, timeSlot }, index) => (
                <li
                  key={`${date}-${timeSlot}-${index}`}
                  className="border-b border-gray-100 pb-2 last:border-0"
                >
                  <span className="inline-block w-6 h-6 text-xs bg-blue-600 text-white rounded-full text-center leading-6 mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium">{date ? formatDate(date) : "No Date"}</span> at{' '}
                  <span>{timeSlot || "No Time"}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleBookAnother}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  const newBlocks = [...prevBlocks];
                  newBlocks[calendarBlockIndex].selectedDate = date;
                  return newBlocks;
                });
              }}
            />
            <button
              onClick={() => setCalendarBlockIndex(null)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default Photoshoot;