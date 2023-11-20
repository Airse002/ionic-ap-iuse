// src/services/apiService.ts
const API_URL = 'https://svatkyapi.cz/api/day';

export const ApiService = {
  fetchData: async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};


