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
  return /* @__PURE__ */ jsx("div", { className: "rcp-container", children: /* @__PURE__ */ jsxs("div", { className: "rcp-wrapper", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: `rcp-btn ${currentPage === 1 ? "rcp-disabled" : ""}`,
        children: prevLabel
      }
    ),
    getPageNumbers().map((page) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(page),
        className: `rcp-page-btn ${page === currentPage ? "rcp-active" : ""}`,
        children: page
      },
      page
    )),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: `rcp-btn ${currentPage === totalPages ? "rcp-disabled" : ""}`,
        children: nextLabel
      }
    )
  ] }) });
};
export {
  ReactCompactPagination
};
//# sourceMappingURL=index.mjs.map