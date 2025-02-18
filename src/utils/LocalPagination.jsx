// Pagination.jsx
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PiCaretLineLeftBold, PiCaretLineRightBold } from 'react-icons/pi';

const LocalPagination = ({ count, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(count / pageSize);

  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination-wrap">
      <ul>
        {/* First Page Button */}
        <li className="first">
          <button 
            disabled={currentPage === 1} 
            onClick={() => goToPage(1)}
          >
            <PiCaretLineLeftBold />
          </button>
        </li>

        {/* Prev Button */}
        <li className="prev">
          <button 
            disabled={currentPage === 1} 
            onClick={() => goToPage(currentPage - 1)}
          >
            <FiChevronLeft />
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
            <button onClick={() => goToPage(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className="next">
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => goToPage(currentPage + 1)}
          >
            <FiChevronRight />
          </button>
        </li>

        {/* Last Page Button */}
        <li className="last">
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => goToPage(totalPages)}
          >
            <PiCaretLineRightBold />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LocalPagination
// // Example usage in a parent component (UserList.jsx)
// import React, { useState, useEffect } from 'react';
// import Pagination from './Pagination';

// const UserList = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const pageSize = 10;

//   // Simulated API call function
//   const fetchData = async (page) => {
//     try {
//       // Replace this with your actual API call
//       const response = await fetch(`your-api-endpoint?page=${page}&page_size=${pageSize}`);
//       const result = await response.json();
      
//       setData(result.data);
//       setTotalCount(result.count);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       {/* Your data display logic here */}
//       <div className="user-list">
//         {data.map(item => (
//           <div key={item.id} className="user-item">
//             {/* Display your data */}
//             {item.name}
//           </div>
//         ))}
//       </div>

//       {/* Pagination component */}
//       <Pagination
//         count={totalCount}
//         pageSize={pageSize}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default UserList;

// // Optional: Add some CSS for styling
// const styles = `
// .pagination-wrap {
//   margin: 20px 0;
// }

// .pagination-wrap ul {
//   display: flex;
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   justify-content: center;
//   align-items: center;
//   gap: 5px;
// }

// .pagination-wrap li {
//   display: flex;
// }

// .pagination-wrap button {
//   padding: 8px 12px;
//   border: 1px solid #ddd;
//   background: white;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-width: 35px;
//   border-radius: 4px;
// }

// .pagination-wrap li.active button {
//   background: #007bff;
//   color: white;
//   border-color: #007bff;
// }

// .pagination-wrap button:disabled {
//   opacity: 0.5;
//   cursor: not-allowed;
// }

// .pagination-wrap button:hover:not(:disabled) {
//   background: #f0f0f0;
// }

// .pagination-wrap li.active button:hover {
//   background: #0056b3;
// }
// `;