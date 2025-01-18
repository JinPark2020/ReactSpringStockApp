import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for storing codes
const CodesContext = createContext();

export const useCodes = () => useContext(CodesContext); // Custom hook for consuming the context

export const CodesProvider = ({ children }) => {
  const [codes, setCodes] = useState(null);

  // Fetch the JSON data from Spring Boot
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getcodes'); // API URL
        if (!response.ok) {
          throw new Error(`Failed to fetch codes. Status: ${response.status}`);
        }
        const data = await response.json();
        setCodes(data); // Save the fetched data in state
      } catch (error) {
        console.error('Error fetching codes:', error);
      }
    };

    fetchCodes();
  }, []);

  return (
    <CodesContext.Provider value={{ codes, setCodes }}>
      {children}
    </CodesContext.Provider>
  );
};
