
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";

const Photoshoot = () => {
  const [appointments, setAppointments] = useState([
    { date: null, selectedSlot: null },
    { date: null, selectedSlot: null },
    { date: null, selectedSlot: null },
  ]);
  const [calendarIndex, setCalendarIndex] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  const formatDate = (date) => {
    return date
      ? date
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, "-")
      : "Select Date";
  };

  const handleDateSelect = (index, date) => {
    setAppointments((prev) => {
      const newAppointments = [...prev];
      newAppointments[index].date = date;
      return newAppointments;
    });
    setCalendarIndex(null);
  };

  const handleSlotSelect = (index, slot) => {
    setAppointments((prev) => {
      const newAppointments = [...prev];
      newAppointments[index].selectedSlot = slot;
      return newAppointments;
    });
  };

  const isFormComplete = appointments.every(
    (app) => app.date !== null && app.selectedSlot !== null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) {
      alert("Please select a date and a slot for all three rows.");
      return;
    }

    let appointmentsJson = {};
    appointments.forEach((app, index) => {
      const slotNumber = ["First", "Second", "Third"][index];
      appointmentsJson[`${slotNumber} Slot Date`] = formatDate(app.date);
      appointmentsJson[`${slotNumber} Slot Time`] =
        app.selectedSlot === "morning" ? "Morning" : "Afternoon";
    });

    axios
      .post("http://localhost:5000/api/claimservices", {
        svc_id: 2,
        svc_info: JSON.stringify(appointmentsJson),
      })
      .then(() => {
        setIsConfirmed(true);
        setConfirmedDetails(appointmentsJson);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleNewAppointment = () => {
    setAppointments([
      { date: null, selectedSlot: null },
      { date: null, selectedSlot: null },
      { date: null, selectedSlot: null },
    ]);
    setIsConfirmed(false);
    setConfirmedDetails(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border-2">
      <h1 className="text-2xl font-bold text-center mb-6">
        Photoshoot Appointment
      </h1>

      {!isConfirmed ? (
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Calendar</th>
                <th className="border p-2">Slot 1</th>
                <th className="border p-2">Slot 2</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr key={index}>
                  <td
                    className="border p-2 cursor-pointer bg-gray-50"
                    onClick={() => setCalendarIndex(index)}
                  >
                    {formatDate(app.date)} 📅
                  </td>
                  <td
                    className={`border p-2 cursor-pointer ${
                      app.selectedSlot === "morning"
                        ? "font-semibold bg-gray-100"
                        : "bg-gray-50"
                    }`}
                    onClick={() => handleSlotSelect(index, "morning")}
                  >
                    Morning
                  </td>
                  <td
                    className={`border p-2 cursor-pointer ${
                      app.selectedSlot === "afternoon"
                        ? "font-semibold bg-gray-100"
                        : "bg-gray-50"
                    }`}
                    onClick={() => handleSlotSelect(index, "afternoon")}
                  >
                    Afternoon
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="submit"
            className={`mt-4 w-full py-2 rounded-md text-white ${
              isFormComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Schedule Appointment
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Appointments Confirmed!</h2>
          {confirmedDetails && (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">Scheduled Details:</h3>
              {Object.entries(confirmedDetails).map(([key, value], index) => (
                <p key={index} className="text-sm">
                  <span className="font-semibold">{key}:</span> {value}
                </p>
              ))}
            </div>
          )}
          <button
            onClick={handleNewAppointment}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Schedule Another Appointment
          </button>
        </div>
      )}

      {calendarIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setCalendarIndex(null)}
          ></div>
          <div className="relative bg-white p-4 rounded shadow-lg">
            <DayPicker
              mode="single"
              selected={appointments[calendarIndex].date}
              onSelect={(date) => handleDateSelect(calendarIndex, date)}
            />
            <button
              onClick={() => setCalendarIndex(null)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
