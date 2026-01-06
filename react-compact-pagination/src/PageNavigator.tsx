import type { ReactNode } from "react";
import cn from "../utils/cn";

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
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-1 p-1  text-sm rounded-[var(--radius)]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-md hover:bg-white hover:text-black cursor-pointer",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          {prevLabel}
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cn(
              "px-3 py-2 rounded-md cursor-pointer",
              page === currentPage && "bg-primary text-white"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-md hover:bg-white hover:text-black cursor-pointer",
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};
