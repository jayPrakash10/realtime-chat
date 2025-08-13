import React from 'react';

const DoubleTickGrayIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280" // gray-500
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
    <path d="M15 6L4 17l-5-5" />
  </svg>
);

export default DoubleTickGrayIcon;
