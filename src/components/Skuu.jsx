import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import tailwindStyles from "./tailwindStyles"; // Importing styles

const formatDateForUI = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const formatDateForPayload = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const shortMonth = date.toLocaleString("en-US", { month: "short" });
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
        const response = await axios.get(
          "http://localhost:5000/api/getServiceDetails?receipt_id=RRR-202503-004"
        );
        const data = response.data;

        const service = data.services.find((svc) => svc.svc_id === 5);
        if (service) {
          setServiceStatus("Requested");
          setServiceDetails(service);

          // Check if svc_info is a string and parse it
          if (service.svc_info && typeof service.svc_info === "string") {
            const svcInfo = JSON.parse(service.svc_info);
            if (svcInfo["Slot Date"]) {
              const dateParts = svcInfo["Slot Date"].split("-");
              const date = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);
              setSelectedDate(date);
            }
          }
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
      "Slot Date": formatDateForPayload(selectedDate),
    };

    const serviceData = {
      receipt_id: "RRR-202503-004",
      svc_id: 5,
      package_id: 1,
      svc_info: JSON.stringify(svcInfo), // Ensure svc_info is a JSON string
      claimed_by: "SoCFwdFhMFgy428mPKgc7R5xXLs1",
      claimer_cat: "tenant",
      serviced_date: null,
      serviced_slot: null,
    };

    try {
      await axios.post("http://localhost:5000/api/claimservices", serviceData);
      setServiceStatus("Requested");
      setServiceDetails(serviceData);
    } catch (error) {
      console.error(
        "Error creating service:",
        error.response?.data || error.message
      );
    }
  };

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div
      className={`max-w-lg mx-auto p-4 sm:p-6 rounded-lg shadow-lg ${tailwindStyles.whiteCard}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-3 py-4 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faFileContract} className="text-gray-600 text-lg" />
          <h2 className={`${tailwindStyles.heading} text-lg sm:text-xl whitespace-nowrap`}>
            Rental Reminder
          </h2>
        </div>

        {/* Status Badge (Always Stays on the Same Line) */}
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${serviceStatus === "Requested"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
            }`}
        >
          {serviceStatus}
        </span>
      </div>

      {/* Content Section */}
      {serviceStatus === "Requested" ? (
        <div className="p-4 text-center">
          <h2 className="text-md font-semibold mb-2">Reminder Set Successfully!</h2>
          <p className={tailwindStyles.paragraph}>
            You will be reminded about your rental agreement on{" "}
            {serviceDetails?.svc_info ? (
              typeof serviceDetails.svc_info === "string" ? (
                // Parse svc_info if it's a string
                JSON.parse(serviceDetails.svc_info)["Slot Date"] || "Invalid Date"
              ) : serviceDetails.svc_info["Slot Date"] ? (
                // Use svc_info directly if it's already an object
                serviceDetails.svc_info["Slot Date"]
              ) : (
                "Invalid Date"
              )
            ) : (
              "Invalid Date"
            )}
          </p>
        </div>
      )
        : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Picker Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Select Date</label>
              <div
                className="border border-gray-300 rounded-md p-2 flex items-center justify-between cursor-pointer"
                onClick={() => setCalendarOpen(true)}
              >
                <span className="text-sm">
                  {selectedDate ? formatDateForUI(selectedDate) : "No date selected"}
                </span>
                <span role="img" aria-label="calendar" className="text-xl">
                  📅
                </span>
              </div>
            </div>

            {/* Claim Now Button */}
            <button
              type="submit"
              disabled={!selectedDate}
              className={`w-full py-2 rounded-md font-semibold transition duration-300 focus:outline-none ${selectedDate
                  ? tailwindStyles.secondaryButton
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Claim Now
            </button>
          </form>
        )}

      {/* Calendar Modal */}
      {calendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setCalendarOpen(false)}
          ></div>
          <div className="relative bg-white p-5 rounded shadow-lg w-full max-w-xs">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setCalendarOpen(false);
              }}
            />
            <button
              onClick={() => setCalendarOpen(false)}
              className="mt-4 w-full py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rental;