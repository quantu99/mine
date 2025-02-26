'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import flowerImage from '../assets/image/flowers.png';

export function Login() {
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(
      username === 'Trần Huyền Trân' ||
        username === 'Daisy' ||
        username === 'Công chúa nhỏ' ||
        username === 'Daisie'
    );
  }, [username]);

  return (
    <div className="z-50 relative">
      <form className="mt-4">
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
          className="block p-2 border mb-2 w-64"
        />

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
      </form>
    </div>
  );
}