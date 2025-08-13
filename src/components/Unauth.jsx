import React, { useState } from "react";
import { useNavigate } from "react-router";

const Unauth = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-[#fcf5eb] h-screen p-4">
      <div className="flex flex-col sm:flex-row justify-center bg-white h-full sm:h-[80vh] w-full max-w-5xl rounded-2xl shadow-lg">
        <div className="flex-1 flex items-center flex-col p-4">
          <DummyAccount />
        </div>
      </div>
    </div>
  );
};

const DummyAccount = () => {
  const navigate = useNavigate();

  const handleClick = (account) => {
    if (account === 1) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          email: "10125prakash@gmail.com",
          uid: "FITxfcY2rgWvDMaiSldIcRu7EhA3",
          displayName: "Jay",
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/resume-82552.appspot.com/o/Jay_1718089489489?alt=media&token=52b40913-0f39-432b-82b9-f1c0d1227a2d",
        })
      );
      navigate("/FITxfcY2rgWvDMaiSldIcRu7EhA3");
    } else {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          email: "mjaycoolp@gmail.com",
          uid: "INX3Gi6FkrX5d8AEF2CbGiwmaef1",
          displayName: "Prakash",
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/resume-82552.appspot.com/o/Prakash_1718091847037?alt=media&token=f9631f2c-9701-42df-84ce-e2f226dcb82e",
        })
      );
      navigate("/INX3Gi6FkrX5d8AEF2CbGiwmaef1");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center text-gray-600 sm:justify-center gap-4">
      <h3 className="text-xl mb-8">Select Dummy Account</h3>
      <Button onClick={() => handleClick(1)}>Account 1</Button>
      <Button onClick={() => handleClick(2)}>Account 2</Button>
    </div>
  );
};

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#25d366] text-green-50 px-4 py-2 rounded-lg shadow-md shadow-green-200 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Unauth;
