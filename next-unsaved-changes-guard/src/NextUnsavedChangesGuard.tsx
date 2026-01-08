"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const alertDialogCSS = `
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

interface UnsavedChangesGuardProps {
  children: React.ReactNode;
  formDirty: boolean;
  saveData: () => Promise<void>;
  formErrors?: Record<string, any>;
}

export const NextUnsavedChangesGuard = ({
  children,
  formDirty,
  saveData,
  formErrors = {},
}: UnsavedChangesGuardProps) => {
  const [isDirty, setDirty] = useState(formDirty);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const router = useRouter();
  const isRouteChanging = useRef(false);

  // Sync isDirty with formDirty prop
  useEffect(() => {
    setDirty(formDirty);
  }, [formDirty]);

  // Handle browser close/refresh
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [isDirty]);

  // Intercept route changes
  useEffect(() => {
    const originalPush = router.push;

    router.push = (url: string) => {
      if (isDirty && !isRouteChanging.current) {
        setNextRoute(url);
        setIsDialogOpen(true);
        return Promise.resolve(); // Prevent navigation without throwing
      }
      isRouteChanging.current = false;
      return originalPush(url);
    };

    return () => {
      router.push = originalPush;
    };
  }, [isDirty, router]);

  // Handle "Save" action
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

  // Handle "Discard" action
  const handleDiscard = () => {
    setDirty(false);
    setIsDialogOpen(false);
    if (nextRoute) {
      isRouteChanging.current = true;
      router.push(nextRoute);
    }
  };

  // Handle "Stay" action
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

  useEffect(() => {
    injectAlertDialogStyles();
  }, []);

  return (
    <>
      {children}
      {isDialogOpen && (
        <div className="nucg-ad-overlay">
          <div className="nucg-ad-dialog" role="alertdialog" aria-modal="true">
            <div>
              <h2 className="nucg-ad-title">Unsaved Changes</h2>
              <p className="nucg-ad-description">
                You have unsaved changes. Do you want to save them before
                leaving?
              </p>
            </div>

            <div className="nucg-ad-footer">
              <button
                className="nucg-ad-btn nucg-ad-cancel"
                onClick={handleStay}
              >
                Stay
              </button>

              <button
                className="nucg-ad-btn nucg-ad-danger"
                onClick={handleDiscard}
              >
                Discard
              </button>

              <button
                className="nucg-ad-btn nucg-ad-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
