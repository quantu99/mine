'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import flowerImage from '../assets/image/flowers.png';

// Component trái tim rơi tách biệt để tránh re-render khi nhập text
const FallingHearts = () => {
  return (
    <div className="absolute w-full inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
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
            y: 100,
            opacity: [0.7, 0.9, 0.7, 0.4, 0],
            rotate: [-5, 5, -3, 5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'linear',
          }}
          style={{ fontSize: `${8 + Math.random() * 6}px` }} // Giảm kích thước trái tim
        >
          ❤️
        </motion.div>
      ))}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute w-[25%] text-pink-500"
          initial={{
            opacity: 0.7,
            x: `${Math.random() * 100}%`,
            y: -10,
            scale: 0.3 + Math.random() * 0.3, // Làm trái tim nhỏ hơn
          }}
          animate={{
            y: 100,
            opacity: [0.7, 0.9, 0.7, 0.4, 0],
            rotate: [-5, 5, -3, 5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
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

// Enhanced Button Hover Effect Component
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

// Border Light Animation
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

export function Login({ setCurrentStep }) {
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsVisible(
      username === 'Trần Huyền Trân' ||
        username === 'Daisy' ||
        username === 'Công chúa nhỏ' ||
        username === 'Daisie' ||
        username === 'Em bé' ||
        username === 'Em yêu' ||
        username === 'Cục cưng' ||
        username === 'Em bé đáng yêu' ||
        username === 'Bé cưng' ||
        username === 'Cục dàng',
    );
  }, [username]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mt-4">
        <div className="relative rounded-[50px] overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-pink-500 opacity-90"></div>

          {/* Tách component trái tim để tránh re-render khi nhập text */}
          <FallingHearts />

          <input
            ref={inputRef}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Em là ai?"
            className="relative caret-transparent z-10 outline-none placeholder:text-white border-none bg-transparent p-4 text-[30px] text-white font-love w-64"
          />
        </div>

        <div className="relative h-12 mt-4">
          {/* Nút tiếp tục với hiệu ứng hover */}
          <motion.button
            type="submit"
            className="relative bg-pink-500 text-white px-4 mt-10 py-2 rounded w-64 z-10 overflow-hidden"
            disabled={!isVisible}
            animate={{
              opacity: isVisible ? 1 : 0.5,
            }}
            whileHover={{
              scale: isVisible ? 1.02 : 1,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: isVisible ? 0.98 : 1,
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.5 }}
            onClick={() => setCurrentStep(2)}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {/* Hiệu ứng hover nằm đúng trên nút */}
            <ButtonHoverEffect isHovered={isButtonHovered && isVisible} />
            {/* Hiệu ứng lướt ánh sáng */}
            {isButtonHovered && isVisible && (
              <motion.div
                className="absolute inset-0 w-1/3 font-love md:text-[28px] text-[24px] h-full bg-gradient-to-r from-transparent via-white to-transparent z-1"
                style={{ skewX: '-20deg' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              />
            )}
            {/* Sparkles effect when button is visible */}
            {isVisible && <Sparkles show={true} />}
            <span className="font-love md:text-[28px] text-[24px]">
              Tiếp tục
            </span>
          </motion.button>

          {/* Hoa bên trái */}
          <motion.div
            className="absolute w-full top-0 left-0 z-30"
            animate={{
              x: isVisible ? -100 : 0,
            }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
          >
            <Image
              key="flower-left-1"
              alt="flowers"
              width={80}
              height={80}
              src={flowerImage}
              className="absolute top-1 left-0"
            />
            <Image
              key="flower-left-2"
              alt="flowers"
              width={70}
              height={70}
              src={flowerImage}
              className="absolute top-4 left-20"
              style={{ transform: 'scaleX(-1)' }} // Lật gương
            />
          </motion.div>

          {/* Hoa bên phải */}
          <motion.div
            className="absolute w-full top-0 -right-3 z-30"
            animate={{
              x: isVisible ? 100 : 0,
            }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
          >
            <Image
              key="flower-right-1"
              alt="flowers"
              width={75}
              height={75}
              src={flowerImage}
              className="absolute top-2 right-0"
              style={{ transform: 'scaleX(-1)' }} // Lật gương
            />
            <Image
              key="flower-right-2"
              alt="flowers"
              width={65}
              height={65}
              src={flowerImage}
              className="absolute top-4 right-16"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
