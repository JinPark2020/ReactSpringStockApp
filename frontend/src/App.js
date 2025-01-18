import React, { useState, useEffect } from 'react';
import SignupForm from './SignupForm';

import { CodesProvider, useCodes } from './CodesContext';

function CodesDisplay() {
  const { codes } = useCodes(); // Access codes from context

  if (!codes) {
    return <p>Loading codes...</p>;
  }

  return (
    <div>
      <h1>Available Codes</h1>
      <pre>{JSON.stringify(codes, null, 2)}</pre>
    </div>
  );
}



function App() {
  const [userData, setUserData] = useState([]); // Store user data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [showSignupForm, setShowSignupForm] = useState(false); // Toggle SignupForm visibility
  const itemsPerPage = 5; // Number of items per page

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user'); // Full API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data); // Update user data state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Determine the current data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management App</h1>

      {/* Toggle Signup Form button */}
      <button
        onClick={() => setShowSignupForm((prev) => !prev)}
        style={{
          padding: '10px',
          background: 'blue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {showSignupForm ? 'Back to User Table' : 'Show Signup Form'}
      </button>

      {/* Show Signup Form or User Table based on state */}
      {showSignupForm ? (
        <SignupForm />
      ) : (
        <>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '10px' }}>ID</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user) => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{user.id}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{user.name}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{user.email}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div style={{ textAlign: 'center' }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  padding: '10px',
                  margin: '0 5px',
                  background: currentPage === index + 1 ? 'blue' : 'gray',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
