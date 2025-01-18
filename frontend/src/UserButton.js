import React, { useState, useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState([]); // 전체 사용자 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 5; // 페이지당 데이터 수

  // API 호출
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user'); // Full API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data); // 데이터 상태 업데이트
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = userData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Data Table</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
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

      {/* 페이징 버튼 */}
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
    </div>
  );
}

export default App;
