import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { theme } = useParams();
  console.log(theme)
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [questionArray, setQuestionArray] = useState([]);
  const [correctArray, setCorrectArray] = useState([]);
  const [wrongArray, setWrongArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  const fetchQuestionArray = async (theme) => {
    const exercisesCollectionRef = collection(db, 'exercises');
    const docRef = doc(exercisesCollectionRef, theme);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const questionArray = Object.entries(docSnap.data()).map(([key, value]) => [key, value]);
      return questionArray;
    } else {
      return [];
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionArray = await fetchQuestionArray(theme);
      setQuestionArray(questionArray);
    };
    fetchQuestions(theme);
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
    setQuestionArray(newArray);
  }, [questionArray]);

  const [isRandomized, setIsRandomized] = useState(false);

  useEffect(() => {
    if (!isRandomized && questionArray.length > 0) {
      randomizeArray();
      setIsRandomized(true);
    }
  }, [questionArray, isRandomized]);

  const correctSound = new Audio('/correct.mp3')

  const wrongSound = new Audio('/wrong.mp3')

  function checkAnswer(answer) {
    if (answer.toLowerCase() === questionArray[currentIndex][1].toLowerCase()) {
      setCorrectArray([...correctArray, questionArray[currentIndex]]);
      setResult('Correct!');
      correctSound.play()
    } else {
      setWrongArray([...wrongArray, questionArray[currentIndex]]);
      setResult(`Incorrect. The correct answer is ${questionArray[currentIndex][1]}`);
      wrongSound.play()
    }
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
    }, 2000);
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
    navigate('/done', { replace: true });
  }

  useEffect(() => {
    if (questionArray.length > 0) {
      checkArray();
    }
  }, [currentIndex, questionArray]);

  const handleCheckAnswer = () => {
    checkAnswer(answer);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckAnswer();
    }
  };

  return (
<div className="flex flex-col h-screen bg-gray-100">
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
        {showResult && (
          <div className="flex justify-center mt-4">
            <h2 className="text-lg font-bold">{result}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;





// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAUweFZXPiDf94j_HNs6-Vw_zBUlFiSVCk",
//     authDomain: "french-vocab-aae9e.firebaseapp.com",
//     projectId: "french-vocab-aae9e",
//     storageBucket: "french-vocab-aae9e.appspot.com",
//     messagingSenderId: "894617566372",
//     appId: "1:894617566372:web:e703b011f2478a706a3a31"
//   };
  

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const Play = () => {
//   const { theme } = useParams();
//   console.log(theme)
//   const navigate = useNavigate();
//   const [answer, setAnswer] = useState('');
//   const [questionArray, setQuestionArray] = useState([]);
//   const [correctArray, setCorrectArray] = useState([]);
//   const [wrongArray, setWrongArray] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const fetchQuestionArray = async (theme) => {
//     const exercisesCollectionRef = collection(db, 'exercises');
//     const docRef = doc(exercisesCollectionRef, theme);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const questionArray = Object.entries(docSnap.data()).map(([key, value]) => [key, value]);
//       return questionArray;
//     } else {
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const questionArray = await fetchQuestionArray(theme);
//       setQuestionArray(questionArray);
//     };
//     fetchQuestions(theme);
//   }, [theme]);

//   const randomizeArray = useCallback(() => {
//     let newArray = [...questionArray];
//     for (let i = newArray.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1));
//       let temp = newArray[i];
//       newArray[i] = newArray[j];
//       newArray[j] = temp;
//     }

//     for (let i = 0; i < newArray.length; i++) {
//       if (Math.random() < 0.5) {
//         let temp = newArray[i][0];
//         newArray[i][0] = newArray[i][1];
//         newArray[i][1] = temp;
//       }
//     }
//     setQuestionArray(newArray);
//   }, [questionArray]);

//   const [isRandomized, setIsRandomized] = useState(false);

//   useEffect(() => {
//     if (!isRandomized && questionArray.length > 0) {
//       randomizeArray();
//       setIsRandomized(true);
//     }
//   }, [questionArray, isRandomized]);

//   function checkAnswer(answer) {
//     if (answer.toLowerCase() === questionArray[currentIndex][1].toLowerCase()) {
//       setCorrectArray([...correctArray, questionArray[currentIndex]]);
//     } else {
//       setWrongArray([...wrongArray, questionArray[currentIndex]]);
//     }
//     setCurrentIndex(currentIndex + 1);
//   }

//   function checkArray() {
//     if (currentIndex >= questionArray.length && wrongArray.length > 0) {
//       setQuestionArray([...wrongArray]);
//       setWrongArray([]);
//       setCurrentIndex(0);
//     } else if (currentIndex >= questionArray.length && wrongArray.length === 0) {
//       endGame(navigate);
//     }
//   }

//   function endGame(navigate) {
//     navigate('/done', { replace: true });
//   }

//   useEffect(() => {
//     if (questionArray.length > 0) {
//       checkArray();
//     }
//   }, [currentIndex, questionArray]);

//   const handleCheckAnswer = () => {
//     checkAnswer(answer);
//     setAnswer('');
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <nav className="bg-teal-500 py-4">
//         <h1 className="text-lg font-bold text-center text-white">Play - {theme}</h1>
//       </nav>

//       <div className="flex-1 p-4">
//         <div className="flex justify-center">
//           {currentIndex < questionArray.length && (
//             <h2 className="text-lg font-bold">{questionArray[currentIndex] && questionArray[currentIndex][0]}</h2>
//           )}
//         </div>
//         <div className="flex justify-center mt-4">
//           <input
//             className="flex-1 p-2 border rounded-l-md"
//             type="text"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//           <button
//             className="px-4 py-2 bg-teal-500 text-white rounded-r-md"
//             onClick={handleCheckAnswer}
//           >
//             Check
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Play;