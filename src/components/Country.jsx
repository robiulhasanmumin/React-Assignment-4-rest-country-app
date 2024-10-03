/* eslint-disable react/prop-types */

import { useState } from "react";

const Country = ({ country, handleCountryDetails }) => {
  const [toggle, setToggle] = useState(false);
  const handleClick = ()=>{
     setToggle(!toggle);
     handleCountryDetails(country);
  }
  return (
    <>
      <div className="bg-gray-800 rounded-xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <img 
            className="w-full h-32 rounded-t-xl " 
            src={country?.flags?.png} 
            alt={country?.flags?.alt} />
          </div>
          <div className=" p-5 space-y-1 pt-1 text-white">
            <h1 className="text-lg">{country?.name?.common}</h1>
            <button className={`${toggle ? "bg-red-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500"} bg-gray-600 w-full py-1 rounded-md `} onClick={handleClick} disabled={toggle}>{toggle ? "Visited" : "Details"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
