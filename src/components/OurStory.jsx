'use client';

import Image from 'next/image';
import banner from '../assets/image/rose2.jpg';
import rain from '../assets/image/rain.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { CountUp } from './CountUp';
import { Messages } from './Messages';
import { LoveLetter } from './LoveLetter';
import { PaulyTalk } from './PaulyTalk';


export function OurStory() {
  const textLines = ['Happy', "Our 1 year love's anniversary and late 8/3"];
  const [displayedTexts, setDisplayedTexts] = useState(['', '']);
  const [index, setIndex] = useState(0);
  const [line, setLine] = useState(0);
  const [raindrops, setRaindrops] = useState([]);

  // Tạo mưa
  useEffect(() => {
    // Tạo các giọt mưa ban đầu
    createInitialRaindrops();

    // Tạo thêm giọt mưa định kỳ
    const rainInterval = setInterval(() => {
      createNewRaindrop();
    }, 300);

    return () => clearInterval(rainInterval);
  }, []);

  // Tạo các giọt mưa ban đầu
  const createInitialRaindrops = () => {
    const initialDrops = [];
    for (let i = 0; i < 20; i++) {
      initialDrops.push(createRaindropObj());
    }
    setRaindrops(initialDrops);
  };

  // Tạo một giọt mưa mới
  const createNewRaindrop = () => {
    setRaindrops((prevDrops) => {
      // Xóa giọt mưa cũ nếu có quá nhiều
      if (prevDrops.length > 50) {
        const newDrops = [...prevDrops];
        newDrops.shift();
        return [...newDrops, createRaindropObj()];
      }
      return [...prevDrops, createRaindropObj()];
    });
  };

  // Hàm tạo đối tượng giọt mưa
  const createRaindropObj = () => {
    const size = Math.random() * 25 + 10; // kích thước từ 10px đến 35px
    return {
      id: Math.random().toString(36).substring(2, 9),
      x: Math.random() * 100, // vị trí ngang (%)
      size,
      duration: Math.random() * 7 + 10, // thời gian rơi từ 10-17s
      delay: Math.random() * 5, // độ trễ
      opacity: Math.random() * 0.7 + 0.3, // độ trong suốt
      rotate: Math.random() * 360, // góc xoay
    };
  };

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
    <div className="relative overflow-hidden">
      {/* Layer mưa xuyên suốt */}
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        {raindrops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute"
            initial={{
              top: -drop.size,
              left: `${drop.x}%`,
              opacity: drop.opacity,
            }}
            animate={{
              top: '100vh',
              left: `calc(${drop.x}% + 200px)`, // Di chuyển theo đường chéo
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              ease: 'linear',
            }}
            style={{
              width: drop.size,
              height: drop.size,
            }}
          >
            <Image
              src={rain}
              alt="raindrop"
              width={drop.size}
              height={drop.size}
              className="w-full h-full object-contain opacity-70"
              style={{
                transform: `rotate(${drop.rotate}deg)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Banner section */}
      <div className="relative w-full md:min-h-[800px] lg:min-h-screen">
        <Image
          src={banner}
          alt="banner"
          className="w-full h-full object-cover brightness-90"
        />
        <motion.div
          className="font-italia text-[100px] hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white text-center px-4 md:flex flex-col gap-20"
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

      {/* Remaining sections */}
      <PaulyTalk content="Xin chào Daisy, lại là anh- Pauly đây! Lời đầu tiên, anh chúc Công chúa có sẽ có một ngày Kỷ niệm và 8/3 thật vui vẻ và đáng nhớ. Còn bây giờ thì hãy tiếp tục khám phá cuộc hành trình này nhé!" />
      <CountUp />
      <Messages />
      <LoveLetter />
      <PaulyTalk content='Chúc mừng em, đến đây là điểm dừng "tạm thời" của chuyến đi kì diệu lần này, anh hi vọng em sẽ thích món quà nhỏ này và sẽ cười thật nhiều khi nghĩ về nó. Và hãy trông chờ vào chuyến đi lần sau, vì sẽ là một chuyến đi xịn xò hơn nữa. Anh yêu em' />
    </div>
  );
}
