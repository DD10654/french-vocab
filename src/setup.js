import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Setup = () => {
    const [ numberOfQuestions, setNOQ ] = useState(true)
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = location.state || {};

    useEffect(() => {
      if (!theme) {
        navigate('/', { replace: true });
      }
    }, [theme, navigate]);

    useEffect(() => {}, [numberOfQuestions])

    function handleStart() {
        navigate('/play', { state: { theme: theme, numberOfQuestions: numberOfQuestions }, replace: true });
    }

    return (
        <div className="h-screen bg-gray-100">
      <nav className="bg-[#2c3e50] py-4">
        <h1 className="text-lg font-bold text-center text-white">Set up your exercise - {theme}</h1>
      </nav>
      {// Number of Questions
      }
        <div className="flex justify-center mt-4">
            <h2 className="text-lg font-bold">Choose the number of questions</h2>
        </div>
        <div className="grid grid-cols-2 mx-5 justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 text-white rounded-md ${numberOfQuestions === 10 ? "bg-[#2c3e50] hover:bg-[#3498db]" : "bg-[#3498db] hover:bg-[#2c3e50]"}`}
            onClick={() => setNOQ(10)}
          >
            10
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${numberOfQuestions === 20 ? "bg-[#2c3e50] hover:bg-[#3498db]" : "bg-[#3498db] hover:bg-[#2c3e50]"}`}
            onClick={() => setNOQ(20)}
          >
            20
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${numberOfQuestions === 30 ? "bg-[#2c3e50] hover:bg-[#3498db]" : "bg-[#3498db] hover:bg-[#2c3e50]"}`}
            onClick={() => setNOQ(30)}
          >
            30
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${numberOfQuestions === true ? "bg-[#2c3e50] hover:bg-[#3498db]" : "bg-[#3498db] hover:bg-[#2c3e50]"}`}
            onClick={() => setNOQ(true)}
          >
            All
          </button>
        {// Start
        }
        <div className="grid grid-cols-1 mx-5 justify-center gap-2 mt-8">
            <button
            className={"px-4 py-2 text-white rounded-md bg-[#3498db] hover:bg-[#2c3e50]"}
            onClick={() => handleStart()}
          >
            Start the exercise with {numberOfQuestions === true ? "all questions" : `${numberOfQuestions} questions`}
          </button>
        </div>
      </div>
      </div>
    )
}

export default Setup