import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUweFZXPiDf94j_HNs6-Vw_zBUlFiSVCk",
  authDomain: "french-vocab-aae9e.firebaseapp.com",
  projectId: "french-vocab-aae9e",
  storageBucket: "french-vocab-aae9e.appspot.com",
  messagingSenderId: "894617566372",
  appId: "1:894617566372:web:e703b011f2478a706a3a31"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Play = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, numberOfQuestions } = location.state || {};
  const [answer, setAnswer] = useState('');
  const [questionArray, setQuestionArray] = useState([]);
  const [correctArray, setCorrectArray] = useState([]);
  const [wrongArray, setWrongArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [numberOfCorrectAnswers, setCorrectAnswers] = useState(0)
  const [numberOfIncorrectAnswers, setIncorrectAnswers] = useState(0)
  const [runCheckAnswer, setCheckAnswer] = useState(true)
  const [isRandomized, setIsRandomized] = useState(false);

  useEffect(() => {
    if (!theme) {
      navigate('/', { replace: true });
    }
  }, [theme, navigate]);

  useEffect(() => {
    if (!numberOfQuestions) {
      navigate('/', { replace: true });
    }
  }, [numberOfQuestions, navigate]);

  const fetchQuestionArray = async (theme) => {
    try {
      const exercisesCollectionRef = collection(db, 'exercises');
      const docRef = doc(exercisesCollectionRef, `french-b1/${theme}/vocab`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Map over each entry and replace the characters as needed
        const questionArray = Object.entries(docSnap.data()).map(([key, value]) => [
          key.replace(/\u2019/g, "'").replace(/…/g, "..."),
          value.replace(/\u2019/g, "'").replace(/…/g, "...")
        ]);
        return questionArray;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
        
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionArray = await fetchQuestionArray(theme);
      setQuestionArray(questionArray);
    };
    fetchQuestions();
  }, [theme]);

  const randomizeArray = useCallback(() => {
    let newArray = [...questionArray];
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }

    for (let i = 0; i < newArray.length; i++) {
      if (Math.random() < 0.5) {
        let temp = newArray[i][0];
        newArray[i][0] = newArray[i][1];
        newArray[i][1] = temp;
      }
    }

    if (numberOfQuestions != true) {
      setQuestionArray(newArray.slice(0, numberOfQuestions));
    } else {
      setQuestionArray(newArray);
    }
  }, [questionArray, numberOfQuestions]);

  useEffect(() => {
    if (!isRandomized && questionArray.length > 0) {
      randomizeArray();
      setIsRandomized(true);
    }
  }, [questionArray, isRandomized, randomizeArray]);

  const correctSound = new Audio('/correct.mp3');
  const wrongSound = new Audio('/wrong.mp3');

  function checkAnswer(answer) {
    if (answer.toLowerCase().trim() === questionArray[currentIndex][1].toLowerCase()) {
      setCorrectArray([...correctArray, questionArray[currentIndex]]);
      setResult('Correct!');
      setCorrectAnswers(numberOfCorrectAnswers + 1);
      correctSound.play();
    } else {
      setWrongArray([...wrongArray, questionArray[currentIndex]]);
      setResult(`Incorrect. The correct answer is ${questionArray[currentIndex][1]}`);
      setIncorrectAnswers(numberOfIncorrectAnswers + 1);
      wrongSound.play();
    }
    setShowResult(true);
    setCheckAnswer(false);
  }

  function checkArray() {
    if (currentIndex >= questionArray.length && wrongArray.length > 0) {
      setQuestionArray([...wrongArray]);
      setWrongArray([]);
      setCurrentIndex(0);
    } else if (currentIndex >= questionArray.length && wrongArray.length === 0) {
      endGame(navigate);
    }
  }

  function endGame(navigate) {
    navigate('/done', { replace: true, state: { numberOfQuestions: numberOfCorrectAnswers, numberOfIncorrectAnswers: numberOfIncorrectAnswers } });
  }

  useEffect(() => {
    if (questionArray.length > 0) {
      checkArray();
    }
  }, [currentIndex, questionArray]);

  const handleNextQuestion = () => {
    setShowResult(false);
    setCurrentIndex(currentIndex + 1);
    setAnswer('');
    setCheckAnswer(true);
  }

  const handleCheckAnswer = () => {
    if (runCheckAnswer) {
      checkAnswer(answer);
    } else {
      handleNextQuestion();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckAnswer();
    }
  };

  const letters = ["à", "á", "â", "è", "é", "ê", "î", "í", "ô", "œ", "û", "ç"];
  const buttons = letters.map((letter) =>
    <button
      className="px-4 py-2 bg-[#3498db] hover:bg-[#2c3e50] text-white rounded-md mx-1"
      onClick={() => setAnswer(answer + letter)}
      key={letter}
    >
      {letter}
    </button>
  );

  return (
    <div className={`h-screen`}>
      <nav className="bg-[#2c3e50] py-4">
        <h1 className="text-lg font-bold text-center text-white">Play - {theme}</h1>
      </nav>

      <div className="flex-1 p-4">
        <div className="flex justify-center">
          {currentIndex < questionArray.length && (
            <h2 className="text-lg font-bold">{questionArray[currentIndex] && questionArray[currentIndex][0]}</h2>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <input
            className="flex-1 p-2 border rounded-l-md"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="px-4 py-2 bg-[#3498db] hover:bg-[#2c3e50] text-white rounded-r-md"
            onClick={handleCheckAnswer}
          >
            Check
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {buttons}
      </div>
      <div className="grid justify-center mt-4">
        <h2 className="text-lg font-bold py-1 text-center">
          Number of Correct Answers: {numberOfCorrectAnswers}
        </h2>
        <h2 className="text-lg font-bold py-1 text-center">
          Number of Incorrect Answers: {numberOfIncorrectAnswers}
        </h2>
      </div>
      {showResult && (
        <div className="flex justify-center mt-4">
          <h2 className="text-lg font-bold">{result}</h2>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-[#3498db] hover:bg-[#2c3e50] text-white rounded-md"
          onClick={handleNextQuestion}
          style={{ display: showResult ? 'block' : 'none' }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Play;