import React from "react";

function Modal({ open, onClickBackdrop, className, children }) {
  const containerClasses = `modal ${open ? "modal-open" : ""}`;

  if (!open) return null;

  return (
    <div
      aria-label="Modal"
      aria-modal={open}
      className={containerClasses}
      onClick={onClickBackdrop}
    >
      <div
        className={`modal-box ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ children, className }) {
  return <div className={`mb-8 w-full text-xl ${className}`}>{children}</div>;
}

function ModalActions({ children, className }) {
  return <div className={`modal-action ${className}`}>{children}</div>;
}

export { Modal, ModalHeader, ModalActions };
