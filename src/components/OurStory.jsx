'use client';
import Image from 'next/image';
import banner from '../assets/image/rose2.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { CountUp } from './CountUp';
import { Messages } from './Messages';

export function OurStory() {
  const textLines = ['Happy', "Our 1 year love's anniversary and late 8/3"];
  const [displayedTexts, setDisplayedTexts] = useState(['', '']);
  const [index, setIndex] = useState(0);
  const [line, setLine] = useState(0);

  // Typing effect
  useEffect(() => {
    let typingInterval;

    if (line < textLines.length) {
      if (index < textLines[line].length) {
        typingInterval = setTimeout(() => {
          setDisplayedTexts((prev) => {
            const newTexts = [...prev];
            newTexts[line] += textLines[line][index];
            return newTexts;
          });
          setIndex((prev) => prev + 1);
        }, 100);
      } else {
        setTimeout(() => {
          setLine((prev) => prev + 1);
          setIndex(0);
        }, 500);
      }
    } else {
      setTimeout(() => {
        setDisplayedTexts(['', '']);
        setIndex(0);
        setLine(0);
      }, 10000);
    }

    return () => clearTimeout(typingInterval);
  }, [index, line]);
  
  return (
    <div>
      <div className="relative w-full md:min-h-[800px] lg:min-h-screen">
        <Image
          src={banner}
          alt='banner'
          className="w-full h-full object-cover brightness-90"
        />
        <motion.div
          className="font-italia text-[100px] hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white text-center px-4  md:flex flex-col gap-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTexts[0]}
          </motion.span>
          <motion.span
            className="text-center whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTexts[1]}
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white font-love text-[30px]"
        >
          <motion.span
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTexts[0]}
          </motion.span>
          <motion.span
            className="text-center whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTexts[1]}
          </motion.span>
        </motion.div>
      </div>
      <CountUp />
      <Messages />
    </div>
  );
}
