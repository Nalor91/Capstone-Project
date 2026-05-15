import React from "react";

const Pagination = ({
  currentPage,
  hasPreviousPage,
  hasNextPage,
  onPrevious,
  onNext
}) => {
  return (
    <div className="pagination">
      <button
        disabled={!hasPreviousPage}
        onClick={onPrevious}
      >
        Previous Page
      </button>

      <span>Page {currentPage}</span>

      <button
        disabled={!hasNextPage}
        onClick={onNext}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;