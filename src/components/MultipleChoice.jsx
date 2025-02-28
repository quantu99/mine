'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Falling hearts component with proper z-index
const FallingHearts = ({ show }) => {
  if (!show) return null;
  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={`heart-${i}`}
        className="absolute w-full text-pink-500"
        initial={{
          opacity: 0.7,
          x: `${Math.random() * 100}%`,
          y: -10,
          scale: 0.3 + Math.random() * 0.3, // Làm trái tim nhỏ hơn
        }}
        animate={{
          y: '5000%',
          opacity: [0.7, 0.9, 0.7, 0.4, 0],
          rotate: [-5, 5, -3, 5],
        }}
        transition={{
          duration: 30 + Math.random() * 40,
          repeat: Infinity,
          delay: Math.random() * 8,
          ease: 'linear',
        }}
        style={{ fontSize: `${8 + Math.random() * 6}px` }} // Giảm kích thước trái tim
      >
        ❤️
      </motion.div>
    ))}
    {[...Array(35)].map((_, i) => (
      <motion.div
        key={`heart-${i + 50}`}
        className="absolute w-[25%] text-pink-500"
        initial={{
          opacity: 0.7,
          x: `${Math.random() * 100}%`,
          y: -10,
          scale: 0.3 + Math.random() * 0.3, // Làm trái tim nhỏ hơn
        }}
        animate={{
          y: '5000%',
          opacity: [0.7, 0.9, 0.7, 0.4, 0],
          rotate: [-5, 5, -3, 5],
        }}
        transition={{
          duration: 30 + Math.random() * 40,
          repeat: Infinity,
          delay: Math.random() * 8,
          ease: 'linear',
        }}
        style={{ fontSize: `${8 + Math.random() * 6}px` }} // Giảm kích thước trái tim
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
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          delay: 0.5,
        }}
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
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          delay: 1.5,
        }}
      />
    </>
  );
};

// Button light effect component
const ButtonHoverEffect = ({ isHovered }) => {
  if (!isHovered) return null;
  
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-300 z-0"
      animate={{
        opacity: [0.5, 0.8, 0.5],
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

export function MultipleChoice() {
  const [questionStep, setQuestionStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Ngày đặc biệt nhất của anh trong năm?',
      options: ['09/03', '25/09', '29/09', '20/10', 'Đáp án khác'],
      correctAnswer: 'Đáp án khác',
    },
    {
      id: 2,
      question: 'Hôm nay là ngày gì ấy nhỉ?',
      options: [
        '8/3 muộn',
        'Our first anniversary',
        'Một buổi đi chơi như thường lệ',
        'Ăn mừng kỉ niệm lần đầu tiên đi chơi cùng nhau',
      ],
      correctAnswer: 'Our first anniversary',
    },
    {
      id: 3,
      question: 'Hôm nay là ngày thứ bao nhiêu tụi mình yêu nhau?',
      options: ['364', '365', '366', '367'],
      correctAnswer: '366',
    },
    {
      id: 4,
      question: 'Em cảm thấy như thế nào khi quen anh?',
      options: ['Hối hận', 'Vui vẻ', 'Buồn chán', 'Hạnh phúc', 'Đáp án khác'],
      correctAnswer: 'Đáp án khác',
    },
    {
      id: 5,
      question: 'Em thích cách anh gọi em như thế nào nhất!',
      options: ['Bé cưng', 'Em bé', 'Baby', 'Bé Trân', 'Đáp án khác'],
      correctAnswer: 'Đáp án khác',
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
    <div className="max-w-md relative overflow-hidden mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-love min-w-[500px]">
      {/* Move the gradient background first (lowest z-index) */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-pink-500 opacity-90 z-0"></div>
      
      <FallingHearts show={true} />
      
      <h2 className="text-[40px] text-[#333333] font-semibold mb-6 relative z-50">{currentQuestion.question}</h2>
      
      <div className="space-y-3 mb-6 relative z-20">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswers[questionStep] === option;

          return (
            <div
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`relative p-3 border rounded-lg cursor-pointer hover:bg-gray-50 overflow-hidden ${
                isSelected ? 'bg-pink-50' : 'border-gray-200'
              }`}
            >
              <BorderLight show={isSelected} />

              <span className="relative text-[#333333] text-[25px] font-semibold z-10">{option}</span>
            </div>
          );
        })}
      </div>

      <div 
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        {/* Button hover effect */}
        <ButtonHoverEffect isHovered={isButtonHovered && !!selectedAnswers[questionStep]} />
        
        {/* Shimmering light effect */}
        {isButtonHovered && !!selectedAnswers[questionStep] && (
          <motion.div
            className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent z-1"
            style={{ skewX: '-20deg' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: 'easeInOut' 
            }}
          />
        )}
        
        <button
          onClick={handleContinue}
          disabled={!selectedAnswers[questionStep]}
          className={`w-full py-2 px-4 text-[#333333] text-[25px] font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:pink-100 focus:ring-opacity-75 relative z-20 ${
            selectedAnswers[questionStep]
              ? 'bg-pink-100 text-white hover:bg-transparent'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}