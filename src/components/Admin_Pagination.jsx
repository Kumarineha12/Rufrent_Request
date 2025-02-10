
import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel3';

import { fetchCities,fetchCommunities,fetchRecords,fetchRmFms } from '../services/newApiServices';
import axios from 'axios';

function Admin() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); 
  const [communities, setCommunities]=useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null); 
  const [records,setRecords]=useState([]);
  const [status,setStatus]=useState([]);
  const[rmfm,setRmfm]=useState([]);
  const[selectedRm,setSelectedRm]=useState(null);

  
useEffect(() => {
    const fetchCitie = async () => {
      try{
        const res=await fetchCities()
        console.log("city",res)
        setCities(res.data.result)
      }catch(error)
      {
        console.error("Error fetching cities",error)
      }
    };
    fetchCitie();
  },[]);

useEffect(() => {
  const fetchCommunitie = async () => {
    if (!selectedCity) {
      setCommunities([]);
      return;
    }
      try {
        const res = await fetchCommunities(selectedCity);
        setCommunities(res.data.result);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    } 
  fetchCommunitie();
}, [selectedCity]);

useEffect(()=>{
    const fetchRecord = async () => {
      try {
        const response = await fetchRecords() 
        setRecords(response.data.result); 
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching Records:', error);
      }
    };
    fetchRecord();
  },[]);

useEffect(() => {
    const fetchrmfm = async () => {
      try {
        const response = await fetchRmFms()
        setRmfm(response.data.result); 
      } catch (error) {
        console.error('Error fetching RM/FM:', error);
      }
    };
    fetchrmfm();
  },[]);

const onUpdateRecord = async (recordId, updateRecords) => {
    try {
      const response = await axios.put(
        'http://localhost:5000/api/updateTask',
        {
          id: recordId,
          cur_stat_code: parseInt(updateRecords.currentStatus),
          schedule_date: updateRecords.updatedScheduleDate,
          schedule_time: updateRecords.updatedScheduleTime,
          fm_id: parseInt(updateRecords.updatedFm),
          rm_id: parseInt(updateRecords.updatedRm),
        }
      );
      console.log("response", response); 
      if (response.status) {
        alert('Record updated successfully!');
      } else {
        alert('Failed to update record!');
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminPanel 
      cities={cities}
      communities={communities}
      onCityChange={setSelectedCity} 
      onCommunityChange={setSelectedCommunity} 
      records={records}
      status={status}
      rmfm={rmfm} 
      onRmChange={setSelectedRm}
      onUpdateRecord={onUpdateRecord}
      />
    </div>
  );
}

export default Admin;



