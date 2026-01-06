import type { ReactNode } from "react";

export interface ReactCompactPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
}

export const ReactCompactPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
  prevLabel = "‹",
  nextLabel = "›",
}: ReactCompactPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start < maxVisiblePages - 1) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="rcp-container">
      <div className="rcp-wrapper">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rcp-btn ${currentPage === 1 ? "rcp-disabled" : ""}`}
        >
          {prevLabel}
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`rcp-page-btn ${
              page === currentPage ? "rcp-active" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rcp-btn ${
            currentPage === totalPages ? "rcp-disabled" : ""
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};
