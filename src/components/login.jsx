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

export function Login({ setCurrentStep }) {
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsVisible(
      username === 'Trần Huyền Trân' ||
        username === 'Daisy' ||
        username === 'Công chúa nhỏ' ||
        username === 'Daisie' ||
        username === 'Em bé' ||
        username === 'Em yêu'
    );
  }, [username]);

  return (
    <div className="z-50 relative">
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
          {/* Nút tiếp tục */}
          <motion.button
            type="submit"
            className="bg-pink-500 text-white px-4 mt-10 py-2 rounded w-64"
            disabled={!isVisible}
            animate={{
              opacity: isVisible ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
            onClick={() => setCurrentStep(2)}
          >
            Tiếp tục
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
