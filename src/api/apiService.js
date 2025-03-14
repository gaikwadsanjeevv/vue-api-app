// src/api/apiService.js
import axios from "axios";

const API_URL = "https://meowfacts.herokuapp.com/";

export const fetchMeowFact = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data[0]; // Extracts the fact from the response
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    return "Failed to fetch fact";
  }
};
