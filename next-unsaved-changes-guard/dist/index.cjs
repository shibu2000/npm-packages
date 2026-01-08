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

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  NextUnsavedChangesGuard: () => NextUnsavedChangesGuard
});
module.exports = __toCommonJS(index_exports);

// src/NextUnsavedChangesGuard.tsx
var import_react = require("react");
var import_navigation = require("next/navigation");
var import_jsx_runtime = require("react/jsx-runtime");
var alertDialogCSS = `
      .nucg-ad-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.45);
        backdrop-filter: blur(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        animation: ad-fade-in .15s ease-out;
      }

      .nucg-ad-dialog {
        width: 100%;
        max-width: 420px;
        background: #ffffff;
        border-radius: 12px;
        padding: 24px;
        box-shadow:
          0 10px 30px rgba(0,0,0,0.15),
          0 1px 2px rgba(0,0,0,0.1);
        animation: ad-scale-in .15s ease-out;
      }

      .nucg-ad-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
        margin-bottom: 6px;
      }

      .nucg-ad-description {
        font-size: 0.95rem;
        color: #6b7280;
        line-height: 1.45;
      }

      .nucg-ad-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      .nucg-ad-btn {
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 0.875rem;
        border: none;
        cursor: pointer;
        transition: background .15s ease, transform .05s ease;
      }

      .nucg-ad-btn:active {
        transform: scale(0.97);
      }

      .nucg-ad-cancel {
        background: #f3f4f6;
        color: #111827;
      }
      .nucg-ad-cancel:hover {
        background: #e5e7eb;
      }

      .nucg-ad-danger {
        background: #fee2e2;
        color: #b91c1c;
      }
      .nucg-ad-danger:hover {
        background: #fecaca;
      }

      .nucg-ad-primary {
        background: #111827;
        color: #ffffff;
      }
      .nucg-ad-primary:hover {
        background: #1f2937;
      }

      @keyframes nucg-ad-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes nucg-ad-scale-in {
        from { transform: scale(.96); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
`;
var NextUnsavedChangesGuard = ({
  children,
  formDirty,
  saveData,
  formErrors = {}
}) => {
  const [isDirty, setDirty] = (0, import_react.useState)(formDirty);
  const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
  const [nextRoute, setNextRoute] = (0, import_react.useState)(null);
  const router = (0, import_navigation.useRouter)();
  const isRouteChanging = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    setDirty(formDirty);
  }, [formDirty]);
  (0, import_react.useEffect)(() => {
    const handleWindowClose = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [isDirty]);
  (0, import_react.useEffect)(() => {
    const originalPush = router.push;
    router.push = (url) => {
      if (isDirty && !isRouteChanging.current) {
        setNextRoute(url);
        setIsDialogOpen(true);
        return Promise.resolve();
      }
      isRouteChanging.current = false;
      return originalPush(url);
    };
    return () => {
      router.push = originalPush;
    };
  }, [isDirty, router]);
  const handleSave = async () => {
    if (Object.keys(formErrors).length === 0) {
      try {
        await saveData();
        setDirty(false);
        setIsDialogOpen(false);
        if (nextRoute) {
          isRouteChanging.current = true;
          router.push(nextRoute);
        }
      } catch (error) {
        console.log("Error saving changes");
      }
    } else {
      setIsDialogOpen(false);
      console.log("Form contains errors");
    }
  };
  const handleDiscard = () => {
    setDirty(false);
    setIsDialogOpen(false);
    if (nextRoute) {
      isRouteChanging.current = true;
      router.push(nextRoute);
    }
  };
  const handleStay = () => {
    setIsDialogOpen(false);
    setNextRoute(null);
  };
  function injectAlertDialogStyles() {
    if (typeof document === "undefined") return;
    if (!document.getElementById("alert-dialog-styles")) {
      const style = document.createElement("style");
      style.id = "alert-dialog-styles";
      style.textContent = alertDialogCSS;
      document.head.appendChild(style);
    }
  }
  (0, import_react.useEffect)(() => {
    injectAlertDialogStyles();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    children,
    isDialogOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nucg-ad-overlay", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "nucg-ad-dialog", role: "alertdialog", "aria-modal": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "nucg-ad-title", children: "Unsaved Changes" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "nucg-ad-description", children: "You have unsaved changes. Do you want to save them before leaving?" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "nucg-ad-footer", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: "nucg-ad-btn nucg-ad-cancel",
            onClick: handleStay,
            children: "Stay"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: "nucg-ad-btn nucg-ad-danger",
            onClick: handleDiscard,
            children: "Discard"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: "nucg-ad-btn nucg-ad-primary",
            onClick: handleSave,
            children: "Save"
          }
        )
      ] })
    ] }) })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NextUnsavedChangesGuard
});
//# sourceMappingURL=index.cjs.map