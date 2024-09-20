import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import './Leader.css';

const Leader = ({ vdata }) => {
  // Use vdata from props and sort users by plant count (descending)
  const data = useMemo(() => {
    return [...vdata].sort((a, b) => b.plantCount - a.plantCount).map((user, index) => ({
      rank: index + 1,
      userName: user.userName,
      planted: user.plantCount,
    }));
  }, [vdata]);

  // Define columns for the table
  const columns = useMemo(
    () => [
      { Header: 'Rank', accessor: 'rank' }, // Rank column
      { Header: 'User Name', accessor: 'userName' }, // User Name column
      { Header: 'No. of Plants', accessor: 'planted' }, // Number of plants column
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  // Calculate the data to display for the current page
  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return data.slice(start, start + pageSize);
  }, [currentPage, data]);

  // Use the useTable hook with paginated data
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: paginatedData });

  // Handle next and previous page buttons
  const handleNextPage = () => {
    if ((currentPage + 1) * pageSize < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className='leaderboa'>Leaderboard</h1>
      <table {...getTableProps()} className="leaderboard-table">
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerIndex}`}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th {...column.getHeaderProps()} key={`header-cell-${columnIndex}`}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} key={`cell-${rowIndex}-${cellIndex}`}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Back
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * pageSize >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leader;
