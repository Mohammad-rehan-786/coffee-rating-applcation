import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

export const Toast = ({ toast, onClose }) => {
  if (!toast || !toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'warning':
        return <AlertTriangle size={20} className="toast-icon warning" />;
      case 'info':
        return <Info size={20} className="toast-icon info" />;
      case 'success':
      default:
        return <CheckCircle2 size={20} className="toast-icon success" />;
    }
  };

  return (
    <div className={`toast-container ${toast.type || 'success'}`} role="alert" aria-live="polite">
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};
