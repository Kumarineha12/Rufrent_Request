
import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle, faCheck, faMoon } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const AdminPanel = ({
  cities,
  communities,
  onCityChange,
  records,
  status,
  onCommunityChange,
  rmfm,
  rm,
  onRmChange,
  onUpdateRecord,
}) => {
  const [updateRecords, setUpdateRecords] = useState({});
  const [filteredRecords, setFilteredRecords] = useState([]); 
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedRm, setSelectedRm] = useState(null);


  const applyFilters = (records, communityId, rmId) => {
    let updatedRecords = records;
  
    if (communityId) {
      updatedRecords = updatedRecords.filter(
        (record) => record.community_id === parseInt(communityId)
      );
    }
  
    if (rmId) {
      updatedRecords = updatedRecords.filter(
        (record) => record.rm_id === parseInt(rmId)
      );
    }
    return updatedRecords;
  };


  // Apply filters whenever records, selectedCommunity, or selectedRm change
  useEffect(() => {
    const filtered = applyFilters(records, selectedCommunity, selectedRm);
    setFilteredRecords(filtered);
  }, [records, selectedCommunity, selectedRm]);

  const handleCommunityChange = (communityId) => {
    setSelectedCommunity(communityId);
    onCommunityChange(communityId);
  };


  const handleRmChange = (transactionId, rmId) => {
    setUpdateRecords((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId],
        updatedRm: rmId, 
      },
    }));
  };
  
  const handleTopRmChange = (rmId) => {
    setSelectedRm(rmId);
    onRmChange(rmId);
  };

  const handleFmChange = (transactionId, fmId) => {
    console.log('fmid',fmId)
    setUpdateRecords((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId], 
        updatedFm: fmId,     
      },
    }));
  };

  const handleStatusChange = (transactionId, statusId) => {
    setUpdateRecords((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId],
        currentStatus: statusId,
      },
    }));
  };

  const handleScheduleChange = (transactionId, key, value) => {
    setUpdateRecords((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId],
        [key]: value,
      },
    }));
  };

  const handleUpdateClick = (transactionId) => {
    const updatedRecord = updateRecords[transactionId];
    onUpdateRecord(transactionId, updatedRecord || {});
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-white h-16 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-10 py-4">
            <h1 className="text-xl font-semibold text-gray-800 ml-60">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faMoon} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-gray-50 p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center p-6 border-b justify-between">
              <h3 className="text-lg font-medium text-gray-900 py-5">Requests</h3>
              <div className="flex ml-auto items-center space-x-4">
                <select
                  className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
                  onChange={(e) => onCityChange(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
                  onChange={(e) => handleCommunityChange(e.target.value)}
                >
                  <option value="">Select Community</option>
                    {communities?.map((item) => (

                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
                  onChange={(e) => handleTopRmChange(e.target.value)}
                >
                  <option value="">Select RM</option>
                  {rm?.map((item) => (
                    <option key={item.rm_id} value={item.rm_id}>
                      {item.rm_name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Search requests..."
                className="border rounded-lg p-2 text-sm w-45 ml-4"
              />
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Community
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Tenant Details
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Owner Details
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    RM
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    FM
                  </th>
                  <th className="px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.transaction_id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.transaction_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.community_name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{record.tenant_name}</div>
                      <div className="text-sm text-gray-500">{record.tenant_mobile}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{record.owner_name}</div>
                      <div className="text-sm text-gray-500">{record.owner_mobile}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={
                          updateRecords[record.transaction_id]?.currentStatus ||
                          record.curr_stat_code_id
                        }
                        onChange={(e) =>
                          handleStatusChange(record.transaction_id, e.target.value)
                        }
                        className="px-2 py-1 text-xs rounded border border-gray-300"
                      >
                        {status?.map((statusItem) => (
                          <option key={statusItem.id} value={statusItem.id}>
                            {statusItem.status_code}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="date"
                        defaultValue={record.schedule_date}
                        onChange={(e) =>
                          handleScheduleChange(record.transaction_id, "updatedScheduleDate", e.target.value)
                        }
                        className="border rounded px-2 py-1 mb-1 w-full"
                      />
                      <input
                        type="time"
                        defaultValue={record.schedule_time}
                        onChange={(e) =>
                          handleScheduleChange(record.transaction_id, "updatedScheduleTime", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={updateRecords[record.transaction_id]?.updatedRm || record.rm_id}
                        className="px-2 py-1 text-xs rounded border border-gray-300"
                        onChange={(e) =>
                          handleRmChange(record.transaction_id, e.target.value)
                        }
                      >
                        {rmfm?.map((rmItem) => (
                          <option key={rmItem.rm_id} value={rmItem.rm_id}>
                            {rmItem.rm_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={updateRecords[record.transaction_id]?.updatedFm || record.fm_id}
                        className="px-2 py-1 text-xs rounded border border-gray-300"
                        onChange={(e) =>
                          handleFmChange(record.transaction_id, e.target.value)
                        }
                      >
                        {rmfm?.map((fmItem) => (
                          <option key={fmItem.fm_id} value={fmItem.fm_id}>
                            {fmItem.fm_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleUpdateClick(record.transaction_id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4 space-x-4">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Previous
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;