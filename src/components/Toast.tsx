import { useEffect, useRef, useState } from "react";
import type { ToastType } from "../features/ToastPage";
import styles from "./Toast.module.css";

export interface ToastProps {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onRemove: () => void;
}

const Toast = ({
  id,
  type = "info",
  title,
  message,
  duration = 4000,
  onRemove,
}: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onRemove();
    }, 320);
  };

  useEffect(() => {
    if (duration <= 0 || isPaused || isExiting) return;

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      startExit();
    }, remainingTimeRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused, isExiting, duration]);

  const handleMouseEnter = () => {
    if (duration <= 0 || isExiting) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (startTimeRef.current > 0) {
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (duration <= 0 || isExiting) return;
    setIsPaused(false);
  };

  const typeClass =
    type === "success"
      ? styles.toastSuccess
      : type === "error"
      ? styles.toastError
      : type === "warning"
      ? styles.toastWarning
      : styles.toastInfo;

  const defaultTitle = title || type;

  return (
    <div
      role="alert"
      aria-live="polite"
      id={`toast-${id}`}
      className={`${styles.toastItem} ${typeClass} ${
        isExiting ? styles.toastExiting : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.toastContent}>
        <div className={styles.iconWrapper} aria-hidden="true">
          {type === "success" && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
          {type === "error" && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {type === "warning" && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
          {type === "info" && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          )}
        </div>

        <div className={styles.textContainer}>
          <h4 className={styles.toastTitle}>{defaultTitle}</h4>
          <p className={styles.toastMessage}>{message}</p>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={startExit}
          aria-label="Close notification"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {duration > 0 && (
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{
              animationDuration: `${duration}ms`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;