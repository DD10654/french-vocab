import React, { useState, useEffect }  from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const WellDone = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { failed } = location.state || {}

  useEffect(() => {
    if (failed == undefined) {
      navigate('/', { replace: true });
    }
  }, [failed, navigate]);

  return (
    <div className="h-screen justify-center bg-gray-100 grid place-items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#2c3e50] p-2">{failed === false ? "Well Done!" : "You failed!"}</h1>
        <p className="text-lg text-[#2c3e50] p-2 pb-8">{failed === false ? "You have completed the exercise" : "Better luck next time"}</p>
        <Link to="/" className="bg-[#3498db] hover:bg-[#2c3e50] text-white font-bold py-2 px-4 rounded">
          Play Again
        </Link>
      </div>
    </div>
  );
};

export default WellDone;