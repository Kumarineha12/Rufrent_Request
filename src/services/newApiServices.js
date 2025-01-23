
import axios from "axios";
const apiUrl='http://localhost:5000/api'

export const fetchCities=async ()=>{
    try {
        const response = await axios.get(
          `${apiUrl}/getRecords?tableName=st_city&fieldNames=id,name,state_id&whereCondition=rstatus=1`
        );
        return response
      } catch (error) {
        return error
      }
 };


export const fetchCommunities=async (selectedCity)=>{
    try {
        const response = await axios.get(
          `${apiUrl}/getRecords?tableName=st_community&fieldNames=id,name,map_url,total_area&whereCondition=rstatus=1&city=${selectedCity}`
        );
        return response
      } catch (error) {
        return error
      }
 };

export const fetchRms=async (selectedCommunity)=>{
  try {
      const response = await axios.get(
        `${apiUrl}/getFmList?community=${selectedCommunity}`
      );
      return response
    } catch (error) {
      return error
    }
};

export const fetchRecords=async ()=>{
  try {
      const response = await axios.get(
        `${apiUrl}/rmdata`
      );
      return response
    } catch (error) {
      return error
    }
};

export const fetchRmFms=async ()=>{
  try {
      const response = await axios.get(
        `${apiUrl}/getFmList`
      );
      return response
    } catch (error) {
      return error
    }
};






  

