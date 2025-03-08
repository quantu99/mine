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
      className="absolute -top-20 -right-10 sm:-top-28 sm:-right-[60px] z-10 scale-75 sm:scale-100"
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
      <div className="absolute bottom-0 right-0">
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
          className="absolute -bottom-6 left-0 w-7 h-7 bg-white rounded-full shadow-sm blur-[1px]"
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
      <div className="w-28 h-20 sm:w-32 sm:h-24 bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden relative">
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
          className="text-pink-500 text-[30px] relative z-10"
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

export function FairyTale({ setStep }) {
  const [currentStep, setCurrentStep] = useState('initial');
  const [displayedText, setDisplayedText] = useState('...');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messages = {
    initial: '...',
    fairyTaleIntro:
      'Em muốn nghe một câu chuyện cổ tích về Daisy không? Anh đã chuẩn bị câu chuyện đặc biệt này rất lâu rồi...',
  };

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Set initial text and start typing
    setCurrentStep('fairyTaleIntro');
    setIsTyping(true);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
    if (option === 'listen') {
      setShowVideo(true);
    } else if (option === 'decline') {
      setStep(6);
    }
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

  if (showVideo) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4 bg-black">
        <motion.h1
          className="text-2xl md:text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Chuyện cổ tích về Daisy
        </motion.h1>
        <motion.div
          className="w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <video
            className="w-full h-auto"
            controls
            autoPlay
            src="/fairy.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={() => setStep(6)}
            onMouseEnter={() => setHoveredOption('continue')}
            onMouseLeave={() => setHoveredOption(null)}
            className="relative py-3 px-8 bg-blue-500 text-white rounded-md overflow-hidden text-lg md:text-xl"
            variants={optionVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            {/* Button hover effect */}
            <ButtonHoverEffect isHovered={hoveredOption === 'continue'} />

            {/* Sparkling effect */}
            {hoveredOption === 'continue' && <Sparkles show={true} />}

            <span className="relative text-[20px] md:text-[24px] z-10">
              Tiếp tục
            </span>
          </motion.button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="relative font-love h-screen flex items-center justify-center w-full px-4 md:px-8 mx-auto">
      {/* Mobile layout - stacked */}
      <div className="flex flex-col md:flex-row-reverse justify-center md:justify-between md:min-w-[850px] items-center md:items-start gap-4">
        {/* Character section */}
        <div className="relative rounded-[50%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] border border-dashed border-slate-400 z-20">
          <div className="flex-shrink-0 z-20 w-36 md:w-48 absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
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
            <div className="px-4 md:px-8 py-2 md:py-3 rounded-sm bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 border border-yellow-700 shadow-md">
              <div className="text-lg md:text-[24px] font-bold text-center text-amber-900">
                Mr.Paulie
              </div>
            </div>
          </div>
        </div>

        {/* Dialogue section */}
        <div className="flex flex-col w-full md:mr-8 max-w-full md:max-w-lg">
          <motion.div
            className="relative p-4 md:p-6 bg-white rounded-lg shadow-md min-h-[120px] md:min-h-40 mt-4 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxHeight: '500px', fontSize: isMobile ? '18px' : '35px' }}
          >
            {/* Add triangle pointer for dialogue indication */}
            <div className="absolute right-1/2 translate-x-1/2 -top-2 md:right-0 md:top-8 md:translate-x-0 w-4 h-4 bg-white transform rotate-45 md:translate-x-2" />

            {/* Add falling hearts and animations inside the chat box */}
            <FallingHearts show={true} />
            {/* Message text */}
            <p className="text-gray-800 z-10 relative text-base md:text-[35px]">
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

          {/* Option buttons */}
          {!isTyping && (
            <div className="mt-4 space-y-2">
              <p className="text-white font-medium mb-2 text-[20px] md:text-[24px]">
                Lựa chọn:
              </p>
              {[
                { id: 'listen', text: 'Lắng nghe' },
                { id: 'decline', text: 'Từ chối' },
              ].map((option, index) => {
                const isHovered = hoveredOption === index;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionClick(option.id)}
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className="relative w-full py-2 px-4 bg-blue-500 text-white rounded-md overflow-hidden text-sm md:text-base"
                    variants={optionVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {/* Button hover effect */}
                    <ButtonHoverEffect isHovered={isHovered} />

                    {/* Sparkling effect */}
                    {isHovered && <Sparkles show={true} />}

                    <span className="relative text-[20px] md:text-[24px] z-10">
                      {option.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
