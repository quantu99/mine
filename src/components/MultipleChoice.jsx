'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Falling hearts component with proper z-index
const FallingHearts = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-500"
          initial={{
            opacity: 0.7,
            x: `${Math.random() * 100}%`,
            y: -10,
            scale: 0.3 + Math.random() * 0.3,
          }}
          animate={{
            y: '400%', // Make hearts fall all the way through the container
            opacity: [0.7, 0.9, 0.7, 0.4, 0],
            rotate: [-5, 5, -3, 5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'linear',
          }}
          style={{ fontSize: `${8 + Math.random() * 6}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

// Border light animation - fixed to properly show around the border
const BorderLight = ({ show }) => {
  if (!show) return null;

  return (
    <>
      {/* Top border light */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
        style={{ width: '100%' }}
        animate={{ left: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />
      
      {/* Right border light */}
      <motion.div
        className="absolute top-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-pink-400 to-transparent"
        style={{ height: '100%' }}
        animate={{ top: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 0.5 }}
      />
      
      {/* Bottom border light */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
        style={{ width: '100%' }}
        animate={{ left: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
      />
      
      {/* Left border light */}
      <motion.div
        className="absolute top-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-pink-400 to-transparent"
        style={{ height: '100%' }}
        animate={{ top: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1.5 }}
      />
    </>
  );
};

export function MultipleChoice() {
  const [questionStep, setQuestionStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'What is your favorite color?',
      options: ['RED', 'WHITE', 'BLUE', 'GREEN'],
      correctAnswer: 'WHITE',
    },
    {
      id: 2,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      id: 3,
      question: 'Which planet is closest to the sun?',
      options: ['Venus', 'Earth', 'Mars', 'Mercury'],
      correctAnswer: 'Mercury',
    },
    {
      id: 4,
      question: 'Who painted the Mona Lisa?',
      options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Monet'],
      correctAnswer: 'Da Vinci',
    },
  ];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionStep]: option,
    });
  };

  const handleContinue = () => {
    const currentQuestion = questions[questionStep];
    const isCorrect =
      selectedAnswers[questionStep] === currentQuestion.correctAnswer;

    if (isCorrect) {
      if (questionStep < questions.length - 1) {
        setQuestionStep(questionStep + 1);
      } else {
        setShowResult(true);
      }
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };

  const resetQuiz = () => {
    setQuestionStep(0);
    setSelectedAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Congratulations!
        </h2>
        <p className="text-center mb-6">
          You have completed the quiz successfully.
        </p>
        <button
          onClick={resetQuiz}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Start Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[questionStep];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswers[questionStep] === option;

          return (
            <div
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`relative p-3 border rounded-lg cursor-pointer hover:bg-gray-50 overflow-hidden ${
                isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
              }`}
            >
              {/* Border light animation - positioned absolutely around the border */}
              <BorderLight show={isSelected} />

              {/* Falling hearts animation - behind the text */}
              <FallingHearts show={isSelected} />

              {/* Option text with relative positioning to stay above animations */}
              <span className="relative z-10">{option}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedAnswers[questionStep]}
        className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
          selectedAnswers[questionStep]
            ? 'bg-blue-500 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
}