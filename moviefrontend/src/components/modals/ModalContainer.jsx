import React from "react";

const ModalContainer = ({ visible, children, ignoreContainer, onClose , className='' }) => {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose &&  onClose();
  };

  if (!visible) return null;

  const renderChildren = () => {
    if (ignoreContainer) return children;
    return (
      <div className="dark:bg-primary bg-white rounded  overflow-auto p-2 custom-scroll-bar">
        {children}
      </div>
    );
  };
  return (
    <div
      onClick={handleClick}
      id="modal-container"
      className={"fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center "+className}
    >
      {renderChildren()}
    </div>
  );
};

export default ModalContainer;
