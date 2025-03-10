import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons'; // Rental Agreement Icon
import axios from 'axios';

const formatDateForUI = (date) => {
  if (!date) return "";
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateForPayload = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, '0');
  const shortMonth = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${shortMonth}-${year}`;
};

const Rental = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [serviceStatus, setServiceStatus] = useState("Available");
  const [serviceDetails, setServiceDetails] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getServiceDetails?receipt_id=RRR-202503-002");
        const data = response.data;
        
        const service = data.services.find(svc => svc.svc_id === 5);
        if (service) {
          setServiceStatus("Requested");
          setServiceDetails(service);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServiceDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    
    const svcInfo = {
      "Slot Date": formatDateForPayload(selectedDate)
    };

    const serviceData = {
      receipt_id: "RRR-202503-002",
      svc_id: 5,
      package_id: 1,
      svc_info: JSON.stringify(svcInfo),
      claimed_by: "SoCFwdFhMFgy428mPKgc7R5xXLs1",
      claimer_cat: "tenant",
      serviced_date: null,
      serviced_slot: null
    };

    try {
      await axios.post("http://localhost:5000/api/claimservices", serviceData);
      setServiceStatus("Requested");
      setServiceDetails(serviceData);
    } catch (error) {
      console.error("Error creating service:", error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg relative">  
      <div className="px-6 py-4 rounded-t-lg flex justify-between items-center">
      <div className="flex items-center space-x-3">
    <FontAwesomeIcon icon={faFileContract} className="text-gray-600 text-lg" />
    <h2 className="text-xl font-semibold">Rental Agreement</h2>
  </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${serviceStatus === "Requested" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
          {serviceStatus}
        </span>
      </div>

      {serviceStatus === "Requested" ? (
        <div className="text-center p-4">
          <h2 className="text-md font-semibold mb-4">Agreement has been send!</h2>
          <p className="text-sm font-sm">{serviceDetails?.svc_info && JSON.parse(serviceDetails.svc_info)["Slot Date"]}</p>
        </div>
      ) : (
       

        <form onSubmit={handleSubmit} className="space-y-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center font-semibold">Select Date</th>
              </tr>
            </thead>
            <tbody className="divide-gray-100">
              <tr>
                <td className="px-2 py-2">
                  <div
                    className="border border-gray-300 rounded-md p-2 flex items-center justify-between cursor-pointer"
                    onClick={() => setCalendarOpen(true)}
                  >
                    <span className="text-sm">
                      {selectedDate ? formatDateForUI(selectedDate) : "No date selected"}
                    </span>
                    <span role="img" aria-label="calendar" className="text-xl">📅</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            type="submit"
            disabled={!selectedDate}
            className={`w-full py-1 px-2 rounded-md font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              selectedDate
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Claim Now
          </button>
        </form>
      )}

      {calendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setCalendarOpen(false)}></div>
          <div className="relative bg-white p-4 rounded shadow-lg z-10">
            <DayPicker mode="single" selected={selectedDate} onSelect={(date) => { setSelectedDate(date); setCalendarOpen(false); }} />
            <button onClick={() => setCalendarOpen(false)} className="mt-4 w-full py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition">Close Calendar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rental;
