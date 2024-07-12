import React from 'react';
import { Link } from 'react-router-dom';

const WellDone = () => {
  return (
    <div className="h-screen justify-center bg-teal-500 grid place-items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-800 p-2">Well Done!</h1>
        <p className="text-lg text-teal-800 p-2 pb-8">You have completed the exercise</p>
        <Link to="/" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Play Again
        </Link>
      </div>
    </div>
  );
};

export default WellDone;