// utils/cn.ts
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var cn_default = cn;

// src/PageNavigator.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ReactCompactPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
  prevLabel = "\u2039",
  nextLabel = "\u203A"
}) => {
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
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1 p-1  text-sm rounded-[var(--radius)]", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: cn_default(
          "p-2 rounded-md hover:bg-white hover:text-black cursor-pointer",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        ),
        children: prevLabel
      }
    ),
    getPageNumbers().map((page) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(page),
        className: cn_default(
          "px-3 py-2 rounded-md cursor-pointer",
          page === currentPage && "bg-primary text-white"
        ),
        children: page
      },
      page
    )),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: cn_default(
          "p-2 rounded-md hover:bg-white hover:text-black cursor-pointer",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        ),
        children: nextLabel
      }
    )
  ] }) });
};
export {
  ReactCompactPagination
};
//# sourceMappingURL=index.mjs.map