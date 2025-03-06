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
            scale: 0.3 + Math.random() * 0.3,
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
          style={{ fontSize: `${8 + Math.random() * 6}px` }}
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
            scale: 0.3 + Math.random() * 0.3,
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
          style={{ fontSize: `${8 + Math.random() * 6}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Border light animation
const BorderLight = ({ show }) => {
  if (!show) return null;

  return (
    <>
      {/* Top border light */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300"
        style={{ width: '100%' }}
        animate={{
          left: ['-100%', '100%'],
          boxShadow: [
            '0 0 2px rgba(255, 105, 180, 0.5)',
            '0 0 8px rgba(255, 105, 180, 0.8)',
            '0 0 2px rgba(255, 105, 180, 0.5)',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          boxShadow: {
            repeat: Infinity,
            duration: 1.5,
          },
        }}
      />

      {/* Right border light */}
      <motion.div
        className="absolute top-0 right-0 w-1 bg-gradient-to-b from-purple-300 via-pink-400 to-purple-300"
        style={{ height: '100%' }}
        animate={{
          top: ['-100%', '100%'],
          boxShadow: [
            '0 0 2px rgba(255, 105, 180, 0.5)',
            '0 0 8px rgba(255, 105, 180, 0.8)',
            '0 0 2px rgba(255, 105, 180, 0.5)',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          delay: 0.5,
          boxShadow: {
            repeat: Infinity,
            duration: 1.5,
            delay: 0.5,
          },
        }}
      />

      {/* Bottom border light */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300"
        style={{ width: '100%' }}
        animate={{
          left: ['100%', '-100%'],
          boxShadow: [
            '0 0 2px rgba(255, 105, 180, 0.5)',
            '0 0 8px rgba(255, 105, 180, 0.8)',
            '0 0 2px rgba(255, 105, 180, 0.5)',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          delay: 1,
          boxShadow: {
            repeat: Infinity,
            duration: 1.5,
            delay: 1,
          },
        }}
      />

      {/* Left border light */}
      <motion.div
        className="absolute top-0 left-0 w-1 bg-gradient-to-b from-purple-300 via-pink-400 to-purple-300"
        style={{ height: '100%' }}
        animate={{
          top: ['100%', '-100%'],
          boxShadow: [
            '0 0 2px rgba(255, 105, 180, 0.5)',
            '0 0 8px rgba(255, 105, 180, 0.8)',
            '0 0 2px rgba(255, 105, 180, 0.5)',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          delay: 1.5,
          boxShadow: {
            repeat: Infinity,
            duration: 1.5,
            delay: 1.5,
          },
        }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-20"
        animate={{
          backgroundColor: [
            'rgba(255, 182, 193, 0.2)',
            'rgba(216, 131, 240, 0.4)',
            'rgba(255, 182, 193, 0.2)',
          ],
          boxShadow: [
            'inset 0 0 5px rgba(255, 105, 180, 0.2)',
            'inset 0 0 15px rgba(255, 105, 180, 0.4)',
            'inset 0 0 5px rgba(255, 105, 180, 0.2)',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
      />
    </>
  );
};

// Sparkle Animation Component
const Sparkles = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            boxShadow: [
              '0 0 0 rgba(255, 255, 255, 0)',
              '0 0 8px rgba(255, 255, 255, 0.8)',
              '0 0 0 rgba(255, 255, 255, 0)',
            ],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Button light effect component
const ButtonHoverEffect = ({ isHovered }) => {
  if (!isHovered) return null;

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-300 z-0"
      animate={{
        opacity: [0.5, 0.8, 0.5],
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export function MultipleChoice({ setCurrentStep }) {
  const [questionStep, setQuestionStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  const questions = [
    {
      id: 1,
      question: 'Ngày đặc biệt nhất của anh trong năm?',
      options: ['09/03', '25/09', '29/09', '20/10', 'Đáp án khác'],
      correctAnswer: 'Đáp án khác',
      correctFeedback:
        'Đúng rồi, ngày đặc biệt nhất của anh là ngày anh gặp em!',
      incorrectFeedback:
        'Sai rồi, ngày đặc biệt nhất không phải là một ngày cụ thể trong năm...',
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
      correctFeedback:
        'Đúng rồi, hôm nay là kỷ niệm 1 năm chúng mình ở bên nhau!',
      incorrectFeedback:
        'Sai rồi, hôm nay là một ngày rất đặc biệt đối với chúng mình...',
    },
    {
      id: 3,
      question: 'Hôm nay là ngày thứ bao nhiêu tụi mình yêu nhau?',
      options: ['364', '365', '366', '367'],
      correctAnswer: '366',
      correctFeedback:
        'Đúng rồi, đã 366 ngày chúng mình bên nhau, hạnh phúc từng ngày!',
      incorrectFeedback:
        'Sai rồi, năm nay là năm nhuận nên có 366 ngày đó em...',
    },
    {
      id: 4,
      question: 'Em cảm thấy như thế nào khi quen anh?',
      options: ['Hối hận', 'Vui vẻ', 'Buồn chán', 'Hạnh phúc', 'Đáp án khác'],
      correctAnswer: 'Đáp án khác',
      correctFeedback:
        'Đúng rồi, không từ ngữ nào có thể diễn tả hết cảm xúc của chúng mình!',
      incorrectFeedback:
        'Sai rồi, cảm xúc của chúng mình không thể diễn tả bằng một từ đơn giản đâu...',
    },
    {
      id: 5,
      question: 'Em thích cách anh gọi em như thế nào nhất!',
      options: ['Bé cưng', 'Em bé', 'Baby', 'Bé Trân', 'Đáp án khác'],
      correctAnswer: 'Đáp án khác',
      correctFeedback:
        'Đúng rồi, em thích tất cả những cách anh gọi em, miễn là anh gọi với tình yêu!',
      incorrectFeedback: 'Sai rồi, không phải chỉ một cách gọi cụ thể đâu...',
    },
  ];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionStep]: option,
    });
    setFeedbackMessage(null);
  };

  const handleContinue = () => {
    const currentQuestion = questions[questionStep];
    const isCorrect =
      selectedAnswers[questionStep] === currentQuestion.correctAnswer;

    if (isCorrect) {
      setFeedbackMessage({
        text: currentQuestion.correctFeedback,
        isCorrect: true,
      });

      setTimeout(() => {
        if (questionStep < questions.length - 1) {
          setQuestionStep(questionStep + 1);
          setFeedbackMessage(null);
        } else {
          if (setCurrentStep) {
            setCurrentStep(3);
          }
        }
      }, 2000);
    } else {
      setFeedbackMessage({
        text: currentQuestion.incorrectFeedback,
        isCorrect: false,
      });
    }
  };

  const currentQuestion = questions[questionStep];

  const optionVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    selected: {
      y: [0, -3, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="max-w-md relative overflow-hidden mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-love min-w-[500px]">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-pink-500 opacity-90 z-0"></div>

      <FallingHearts show={true} />

      <motion.h2
        className="text-[40px] text-[#333333] font-semibold mb-6 relative z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentQuestion.question}
      </motion.h2>

      {/* Feedback message */}
      {feedbackMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-3 rounded-lg relative z-50 ${
            feedbackMessage.isCorrect
              ? 'bg-green-100 text-green-800 border border-green-400'
              : 'bg-red-100 text-red-800 border border-red-400'
          }`}
        >
          <p className="text-lg font-medium">{feedbackMessage.text}</p>

          {/* Add sparkles effect for correct answers */}
          {feedbackMessage.isCorrect && <Sparkles show={true} />}
        </motion.div>
      )}

      <div className="space-y-4 mb-6 relative z-20">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswers[questionStep] === option;
          const isHovered = hoveredOption === index;

          return (
            <motion.div
              key={index}
              onClick={() => handleAnswerSelect(option)}
              onMouseEnter={() => setHoveredOption(index)}
              onMouseLeave={() => setHoveredOption(null)}
              className={`relative p-4 border rounded-lg cursor-pointer overflow-hidden shadow-sm 
                ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300'
                    : 'border-gray-200 hover:border-pink-200'
                }`}
              variants={optionVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={isSelected ? 'selected' : 'initial'}
            >
              {/* Add a soft glow behind selected options */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-50"
                  animate={{
                    boxShadow: [
                      'inset 0 0 10px rgba(255, 105, 180, 0.2)',
                      'inset 0 0 20px rgba(255, 105, 180, 0.4)',
                      'inset 0 0 10px rgba(255, 105, 180, 0.2)',
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Hover effect */}
              {isHovered && !isSelected && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <BorderLight show={isSelected} />

              {/* Sparkling effect for selected option */}
              {isSelected && <Sparkles show={true} />}

              <span className="relative text-[#333333] text-[25px] font-semibold z-10">
                {option}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Button hover effect */}
        <ButtonHoverEffect
          isHovered={isButtonHovered && !!selectedAnswers[questionStep]}
        />

        {/* Shimmering light effect */}
        {isButtonHovered &&
          !!selectedAnswers[questionStep] &&
          !feedbackMessage?.isCorrect && (
            <motion.div
              className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent z-1"
              style={{ skewX: '-20deg' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            />
          )}

        <button
          onClick={handleContinue}
          disabled={!selectedAnswers[questionStep]}
          className={`w-full py-2 px-4 text-[#333333] text-[25px] font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:pink-100 focus:ring-opacity-75 relative z-20 ${
            selectedAnswers[questionStep]
              ? 'bg-purple-100 text-[#333333s] hover:bg-transparent'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </motion.div>
    </div>
    </div>
  );
}
