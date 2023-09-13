import React from 'react';

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="bg-transparent text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-125"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-6 h-6 inline-block"
      >
        <path
          fillRule="evenodd"
          d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 010-2h9.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default SubmitButton;