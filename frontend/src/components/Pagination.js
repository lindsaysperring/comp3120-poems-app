import React from "react";

/*
Pagination from https://www.w3schools.com/css/css3_pagination.asp
*/

export default function Pagination({ currentPage, totalPages, changePage }) {
  const GeneratePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          className={currentPage === i && "active"}
          onClick={(e) => {
            changePage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div class="pagination">
      {totalPages > 1 && <button onClick={() => {changePage(currentPage-1)}} >&laquo;</button>}
      <GeneratePageNumbers />
      {totalPages > 1 && (
        <>
          <button onClick={() => {changePage(currentPage+1)}}>&raquo;</button>
        </>
      )}
    </div>
  );
}
