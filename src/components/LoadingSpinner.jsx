import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-24 h-24">
        <div className="absolute border-8 border-solid border-gray-200 rounded-full w-24 h-24"></div>
        <div className="absolute border-8 border-solid border-red-600 rounded-full w-24 h-24 animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
