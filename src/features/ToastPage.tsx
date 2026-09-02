import { useState } from "react";
import Toast from "../components/Toast";
import toastStyles from "../components/Toast.module.css";
import styles from "./ToastPage.module.css";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  title?: string;
  duration?: number;
}

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";

const PRESET_MESSAGES: Record<ToastType, { title: string; message: string }> = {
  success: {
    title: "Success",
    message: "Operation completed successfully! All changes have been saved.",
  },
  error: {
    title: "Error Occurred",
    message: "Failed to connect to the remote server. Please retry shortly.",
  },
  warning: {
    title: "Storage Warning",
    message: "Your storage quota has reached 90%. Consider upgrading.",
  },
  info: {
    title: "System Update",
    message: "A new version of the dashboard is available for update.",
  },
};

const ToastPage = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<Position>("top-right");
  const [customMessage, setCustomMessage] = useState("");
  const [customType, setCustomType] = useState<ToastType>("success");
  const [customDuration, setCustomDuration] = useState<number>(4000);

  const handleAddtoast = (
    message: string,
    type: ToastType,
    title?: string,
    duration: number = 4000
  ) => {
    const newToast: ToastItem = {
      id: Date.now() + Math.random(),
      message,
      type,
      title: title || PRESET_MESSAGES[type]?.title,
      duration,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleRemoveToast = (id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setToasts([]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleAddtoast(customMessage, customType, undefined, customDuration);
    setCustomMessage("");
  };

  const handleRandomToast = () => {
    const types: ToastType[] = ["success", "error", "warning", "info"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const preset = PRESET_MESSAGES[randomType];
    handleAddtoast(preset.message, randomType, preset.title, 4000);
  };

  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return toastStyles.posTopLeft;
      case "bottom-right":
        return toastStyles.posBottomRight;
      case "bottom-left":
        return toastStyles.posBottomLeft;
      case "top-right":
      default:
        return toastStyles.posTopRight;
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.badge}>
          <span style={{ fontSize: "14px" }}>⚡</span> Interactive Notifications
        </div>
        <h1 className={styles.pageTitle}>Toast Notification System</h1>
        <p className={styles.pageSubtitle}>
          Trigger animated toast notifications with spring slide-in, fluid exit
          collapse, animated progress timers, and pause-on-hover capability.
        </p>
      </div>

      {/* Position Selector */}
      <div className={styles.positionBar}>
        <span className={styles.positionLabel}>Display Position:</span>
        <div className={styles.pillGroup}>
          {(
            [
              ["top-right", "Top Right"],
              ["top-left", "Top Left"],
              ["bottom-right", "Bottom Right"],
              ["bottom-left", "Bottom Left"],
            ] as const
          ).map(([posKey, label]) => (
            <button
              key={posKey}
              type="button"
              className={`${styles.pillBtn} ${
                position === posKey ? styles.pillBtnActive : ""
              }`}
              onClick={() => setPosition(posKey)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Trigger Actions */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span>Quick Triggers</span>
          {toasts.length > 0 && (
            <span className={styles.activeCount}>
              {toasts.length} active notification{toasts.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className={styles.buttonGrid}>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.btnSuccess}`}
            onClick={() =>
              handleAddtoast(
                PRESET_MESSAGES.success.message,
                "success",
                PRESET_MESSAGES.success.title,
                4000
              )
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Success Toast
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.btnError}`}
            onClick={() =>
              handleAddtoast(
                PRESET_MESSAGES.error.message,
                "error",
                PRESET_MESSAGES.error.title,
                4000
              )
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Error Toast
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.btnWarning}`}
            onClick={() =>
              handleAddtoast(
                PRESET_MESSAGES.warning.message,
                "warning",
                PRESET_MESSAGES.warning.title,
                4500
              )
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Warning Toast
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.btnInfo}`}
            onClick={() =>
              handleAddtoast(
                PRESET_MESSAGES.info.message,
                "info",
                PRESET_MESSAGES.info.title,
                4000
              )
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Info Toast
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.btnRandom}`}
            onClick={handleRandomToast}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Random Toast
          </button>

          {toasts.length > 0 && (
            <button
              type="button"
              className={styles.btnClear}
              onClick={handleClearAll}
            >
              Clear All ({toasts.length})
            </button>
          )}
        </div>
      </div>

      {/* Custom Toast Form */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Custom Notification</div>
        <form onSubmit={handleAddCustom} className={styles.formRow}>
          <input
            type="text"
            className={styles.customInput}
            placeholder="Type your custom toast message..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />

          <select
            className={styles.selectInput}
            value={customType}
            onChange={(e) => setCustomType(e.target.value as ToastType)}
          >
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>

          <select
            className={styles.selectInput}
            value={customDuration}
            onChange={(e) => setCustomDuration(Number(e.target.value))}
          >
            <option value={2000}>2 seconds</option>
            <option value={4000}>4 seconds</option>
            <option value={6000}>6 seconds</option>
            <option value={10000}>10 seconds</option>
          </select>

          <button type="submit" className={styles.btnPrimary}>
            Trigger Toast
          </button>
        </form>
      </div>

      {/* Feature Badges */}
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <h4 className={styles.featureTitle}>🚀 Spring Entrance</h4>
          <p className={styles.featureDesc}>
            Cubic-bezier spring slide-in with subtle scale and icon pop.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h4 className={styles.featureTitle}>⏳ Animated Timer</h4>
          <p className={styles.featureDesc}>
            Smooth progress bar displaying real-time countdown to dismissal.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h4 className={styles.featureTitle}>⏸️ Pause on Hover</h4>
          <p className={styles.featureDesc}>
            Hovering freezes the countdown timer and progress bar animation.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h4 className={styles.featureTitle}>💨 Smooth Exit</h4>
          <p className={styles.featureDesc}>
            Graceful slide-out and height collapse so stacked toasts glide up.
          </p>
        </div>
      </div>

      {/* Floating Toasts Viewport Stack */}
      <div
        className={`${toastStyles.toastViewport} ${getPositionClass()}`}
        aria-live="polite"
      >
        {toasts.map((item) => (
          <Toast
            key={item.id}
            id={item.id}
            message={item.message}
            type={item.type}
            title={item.title}
            duration={item.duration ?? 4000}
            onRemove={() => handleRemoveToast(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastPage;