import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <button onClick={onClose} className="text-gray-600 float-right">&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
