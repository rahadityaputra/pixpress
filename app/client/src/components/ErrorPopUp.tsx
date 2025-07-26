import React from "react";
import Popup from "reactjs-popup";

const ErrorPopUp = ({ message, open, handleClose }) => {
  return (
    <Popup modal open={open} position="center center" closeOnDocumentClick={false}>
      {close => (
        <div className="flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-black mb-4">{message}</p>
            <button onClick={() => {
              close();
              handleClose();
            }} className="bg-black text-white px-4 py-2 rounded">OK</button>
          </div>
        </div>
      )}
    </Popup >
  );
};

export default ErrorPopUp;
