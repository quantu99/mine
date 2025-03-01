'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import image from '../assets/image/boy.png';
import { motion } from 'framer-motion';

const FallingHearts = ({ show }) => {
  if (!show) return null;
  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
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
            y: '3000%',
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

const ButtonHoverEffect = ({ isHovered, isGray = false }) => {
  if (!isHovered) return null;

  return (
    <motion.div
      className={`absolute inset-0 ${
        isGray
          ? 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300'
          : 'bg-gradient-to-r from-purple-200 via-purple-400 to-purple-300'
      } z-0`}
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

const DreamBubble = () => {
  return (
    <motion.div
      className="absolute -top-28 -right-[60px] z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        y: [0, -5, 0],
      }}
      transition={{
        opacity: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        },
        y: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
      }}
    >
      {/* Cloud bubbles floating up to the main bubble */}
      <div className="relative">
        {/* Cloud bubble 1 */}
        <motion.div
          className="absolute -bottom-8 right-12 w-6 h-6 bg-white rounded-full shadow-sm blur-[1px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            y: [-10, -20],
            opacity: [0, 0.7, 0],
            scale: [0.6, 1, 0.8],
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, repeatDelay: 2 },
            opacity: { duration: 3, repeat: Infinity, repeatDelay: 2 },
            scale: { duration: 3, repeat: Infinity, repeatDelay: 2 },
          }}
        />

        {/* Cloud bubble 2 */}
        <motion.div
          className="absolute -bottom-10 right-16 w-8 h-8 bg-white rounded-full shadow-sm blur-[1px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            y: [-5, -25],
            opacity: [0, 0.8, 0],
            scale: [0.5, 0.9, 0.7],
          }}
          transition={{
            y: { duration: 3.5, repeat: Infinity, repeatDelay: 1.5 },
            opacity: { duration: 3.5, repeat: Infinity, repeatDelay: 1.5 },
            scale: { duration: 3.5, repeat: Infinity, repeatDelay: 1.5 },
          }}
        />

        {/* Cloud bubble 3 */}
        <motion.div
          className="absolute -bottom-6 right-20 w-7 h-7 bg-white rounded-full shadow-sm blur-[1px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            y: [-12, -30],
            opacity: [0, 0.7, 0],
            scale: [0.7, 1, 0.8],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, repeatDelay: 1 },
            opacity: { duration: 4, repeat: Infinity, repeatDelay: 1 },
            scale: { duration: 4, repeat: Infinity, repeatDelay: 1 },
          }}
        />

        {/* Smaller bubbles (already in original code) */}
        <motion.div
          className="absolute -bottom-2 right-16 w-4 h-4 bg-white rounded-full shadow-md"
          animate={{
            y: [0, -2, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            },
            opacity: {
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            },
          }}
        />
        <motion.div
          className="absolute -bottom-6 right-10 w-6 h-6 bg-white rounded-full shadow-md"
          animate={{
            y: [0, -3, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 1.7,
              ease: 'easeInOut',
            },
            opacity: {
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            },
          }}
        />
      </div>

      {/* Main thought bubble - cloud-like shape */}
      <div className="w-32 h-24 bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden relative">
        {/* Additional cloud-like effect for the main bubble */}
        <motion.div
          className="absolute -left-2 top-1/2 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -right-2 top-1/2 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: [1.05, 1, 1.05],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute left-1/4 -top-2 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/4 -top-2 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: [1.03, 1, 1.03],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/4 -bottom-2 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: [1.02, 1, 1.02],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute left-1/4 -bottom-2 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
        />

        {/* Original effects */}
        <BorderLight show={true} />
        <Sparkles show={true} />
        <FallingHearts show={true} />

        {/* Light cloud effect inside */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              'radial-gradient(circle, rgba(255,255,255,0.6) 10%, rgba(255,255,255,0) 65%)',
              'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
        />

        <motion.span
          className="text-pink-500 font-bold text-lg relative z-10"
          animate={{
            scale: [1, 1.05, 1],
            color: [
              'rgb(236, 72, 153)', // pink-500
              'rgb(219, 39, 119)', // pink-600
              'rgb(236, 72, 153)', // pink-500
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        >
          Daisieee
        </motion.span>
      </div>
    </motion.div>
  );
};

export function WelcomeBack() {
  const [currentStep, setCurrentStep] = useState('initial');
  const [displayedText, setDisplayedText] = useState('...');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
  const [isContinueButtonHovered, setIsContinueButtonHovered] = useState(false);

  const messages = {
    initial: '...',
    whoAreYou: 'Anh là Pauly, là một người luôn đợi em quay trở lại đây!',
    introduction:
      'Chào mừng em đã trở lại với thế giới của Daisie! Anh là Pauly, là một phiên bản khác của Quân Từ trong thế giới điện tử này. Anh sẽ là người hướng dẫn cho em trong suốt quá trình khám phá chuyến đi thú vị lần này, chuyến đi có tên "Một năm kì diệu của chúng ta". Nói qua một chút để em hiểu rõ hơn, thông qua chuyến đi em có thể nhìn lại hành trình suốt một năm mà đối với riêng anh, là một năm vô cùng "kì diệu". Tại sao anh lại nói thế, và để xem cảm xúc của em xuyên suốt một năm qua là như thế nào. Giờ thì tụi mình bắt đầu nhé!!!',
  };

  useEffect(() => {
    if (!isTyping) return;

    const fullMessage = messages[currentStep];
    let currentIndex = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setDisplayedText(fullMessage.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentStep, isTyping]);

  const handleOptionClick = (option) => {
    if (option === 'whoAreYou') {
      setCurrentStep('whoAreYou');
      setIsTyping(true);
    } else if (option === 'introduction') {
      setCurrentStep('introduction');
      setIsTyping(true);
    }
  };

  const handleBack = () => {
    setCurrentStep('initial');
    setDisplayedText('...');
  };

  const handleContinue = () => {
    console.log('Moving to next step of the journey');
  };

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
    <div className="relative font-love min-w-[850px] my-8 mx-auto">
      <div className="flex flex-row-reverse justify-between items-start">
        <div className="relative rounded-[50%] w-[200px] h-[200px] border border-dashed border-slate-400 z-20">
          <div className="flex-shrink-0 z-20 w-48 absolute -top-10">
            <Image
              src={image}
              width={400}
              height={400}
              alt="Pauly character"
              className="rounded-full"
            />
          </div>
          <DreamBubble />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-[21]">
            <div
              className="px-8 py-3 rounded-sm 
    bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600
    border border-yellow-700
    shadow-md"
            >
              <div
                className="text-[24px] font-bold text-center
      text-amber-900"
              >
                Mr.Paulie
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mr-8 w-full min-w-80 max-w-lg text-[35px]">
          <motion.div
            className="relative p-6 bg-white rounded-lg shadow-md min-h-40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxHeight: '500px' }}
          >
            {/* Add triangle pointer for dialogue indication */}
            <div className="absolute right-0 top-8 w-4 h-4 bg-white transform rotate-45 translate-x-2" />

            {/* Add falling hearts and animations inside the chat box */}
            <FallingHearts show={true} />
            {/* Message text */}
            <p className="text-gray-800 z-10 relative">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              )}
            </p>
          </motion.div>
          {/* Option buttons or navigation buttons */}
          <div className="mt-4">
            {currentStep === 'initial' && (
              <div className="space-y-2">
                <p className="text-gray-600 font-medium mb-2">Trò chuyện:</p>
                {['introduction', 'whoAreYou'].map((option, index) => {
                  const optionText =
                    option === 'introduction' ? 'Em là Daisy nè' : 'Anh là ai?';
                  const isHovered = hoveredOption === index;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className="relative w-full py-2 px-4 bg-blue-500 text-white rounded-md overflow-hidden"
                      variants={optionVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {/* Button hover effect */}
                      <ButtonHoverEffect isHovered={isHovered} />

                      {/* Sparkling effect */}
                      {isHovered && <Sparkles show={true} />}

                      <span className="relative z-10">{optionText}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {(currentStep === 'whoAreYou' ||
              currentStep === 'introduction') && (
              <div className="flex justify-between">
                {/* Back button with hover effects - now with gray gradient like in MultipleChoice */}
                <motion.button
                  onClick={handleBack}
                  onMouseEnter={() => setIsBackButtonHovered(true)}
                  onMouseLeave={() => setIsBackButtonHovered(false)}
                  className="relative py-2 px-4 bg-gray-300 text-gray-700 rounded-md overflow-hidden"
                  variants={optionVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Gray hover effect */}
                  <ButtonHoverEffect
                    isHovered={isBackButtonHovered}
                    isGray={true}
                  />

                  {/* Sparkling effect */}
                  {isBackButtonHovered && <Sparkles show={true} />}

                  <span className="relative z-10">Quay lại</span>
                </motion.button>

                {currentStep === 'introduction' && !isTyping && (
                  <motion.button
                    onClick={handleContinue}
                    onMouseEnter={() => setIsContinueButtonHovered(true)}
                    onMouseLeave={() => setIsContinueButtonHovered(false)}
                    className="relative py-2 px-4 bg-purple-100 text-purple-700 rounded-md overflow-hidden"
                    variants={optionVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {/* Purple gradient hover effect - matching MultipleChoice style */}
                    <ButtonHoverEffect isHovered={isContinueButtonHovered} />

                    {/* Sparkling effect */}
                    {isContinueButtonHovered && <Sparkles show={true} />}

                    {/* Shimmering light effect */}
                    {isContinueButtonHovered && (
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

                    <span className="relative z-10">Tiếp tục</span>
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
