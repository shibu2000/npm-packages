"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ReactCompactPagination: () => ReactCompactPagination
});
module.exports = __toCommonJS(src_exports);

// src/PageNavigator.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rcp-container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rcp-wrapper", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: () => handlePageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: `rcp-btn ${currentPage === 1 ? "rcp-disabled" : ""}`,
        children: prevLabel
      }
    ),
    getPageNumbers().map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: () => handlePageChange(page),
        className: `rcp-page-btn ${page === currentPage ? "rcp-active" : ""}`,
        children: page
      },
      page
    )),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactCompactPagination
});
//# sourceMappingURL=index.js.map