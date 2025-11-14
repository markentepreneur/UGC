"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorView: React.FC<Props> = ({ reset }) => {
  return (
    <div className="p-4 text-center text-red-600">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-3 px-4 py-2 rounded bg-blue-600 text-white"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorView;
