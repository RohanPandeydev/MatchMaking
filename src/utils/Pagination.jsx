import React from 'react';
import { BsChevronBarRight } from 'react-icons/bs';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PiCaretLineLeftBold, PiCaretLineRight, PiCaretLineRightBold } from 'react-icons/pi';
import { RiSkipRightLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';

const Pagination = ({ count, pageSize }) => {
  const totalPages = Math.ceil(count / pageSize);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the current page and limit from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentLimit = parseInt(searchParams.get('limit')) || pageSize || 10;

  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    searchParams.set('page', pageNumber);
    searchParams.set('limit', currentLimit); // Preserve limit value
    navigate(`${location.pathname}?${searchParams.toString()}`);
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

export default Pagination;
