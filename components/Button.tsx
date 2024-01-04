import React from "react";

const Button = () => {
  return (
    <button
      type="submit"
      className={`bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-7 cursor-pointer text-center bg-black text-white font-bold`}
    >
      Search
    </button>
  );
};

export default Button;
