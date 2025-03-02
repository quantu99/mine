'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import grass from '../assets/image/grass.png';
import character from '../assets/image/boywalk.png';
import moon from '../assets/image/moon.png';
import sun from '../assets/image/sun.png';
import star from '../assets/image/stars.png';
import princess from '../assets/image/princess.png';
import heart from '../assets/image/heart.png';

// Tách component FallingHearts để tránh re-render
const FallingHearts = () => {
  return (
    <div className="absolute w-full inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
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
          style={{ fontSize: `${8 + Math.random() * 6}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export function StoryTour({setCurrentStep}) {
  // Game state
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [hearts, setHearts] = useState([
    { id: 1, x: 250, y: 120, collected: false },
    { id: 2, x: 450, y: 120, collected: false },
    { id: 3, x: 650, y: 120, collected: false },
  ]);
  const [heartsCollected, setHeartsCollected] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showPrincess, setShowPrincess] = useState(false);
  const [princessOpacity, setPrincessOpacity] = useState(0);
  const [showFinalHeart, setShowFinalHeart] = useState(false);
  const [sunPosition, setSunPosition] = useState({ top: 16, right: 10, opacity: 0.3 });
  const [moonPosition, setMoonPosition] = useState({ top: 16, left: 10, opacity: 1 });
  const [dayTransition, setDayTransition] = useState(false);
  const [skyColor, setSkyColor] = useState('rgb(0, 0, 0)'); // Start with black
  const [showChatBubbles, setShowChatBubbles] = useState(false);
  const [starsOpacity, setStarsOpacity] = useState(1); // Separate state for stars opacity
  const [floatingHearts, setFloatingHearts] = useState([]);
  
  const gameContainerRef = useRef(null);
  const groundLevel = 120; // Distance from bottom
  const princessPosition = 500;

  // Messages for each heart
  const heartMessages = [
    'You found the first heart! Keep exploring to find more.',
    'Second heart collected! Just one more to find.',
    "Great job! You've found all the hearts. The princess will appear as day comes!",
  ];

  // Handle keyboard input - Thay đổi: Cập nhật sự kiện facingRight chỉ khi nhấn mũi tên trái
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showMessage) {
        if (e.key === 'Enter' && showMessage) {
          setShowMessage(false);
          if (heartsCollected === 3 && !dayTransition) {
            setDayTransition(true);
          }
        }
        return;
      }

      const speed = 15;

      switch (e.key) {
        case 'ArrowLeft':
          setPlayerPosition((prev) => ({
            ...prev,
            x: Math.max(50, prev.x - speed),
          }));
          setFacingRight(false); // Chỉ đặt facingRight = false khi nhấn mũi tên trái
          break;
        case 'ArrowRight':
          setPlayerPosition((prev) => ({
            ...prev,
            x: Math.min(750, prev.x + speed),
          }));
          setFacingRight(true); // Đặt facingRight = true khi nhấn mũi tên phải
          break;
        case 'ArrowUp':
          if (!isJumping) {
            setIsJumping(true);
            // Check for heart collision during jump
            const jumpInterval = setInterval(() => {
              setPlayerPosition((prev) => {
                // Simple jump arc
                if (prev.y < 100 && isJumping) {
                  return { ...prev, y: prev.y + 10 };
                } else {
                  // Reset jumping when landing
                  setIsJumping(false);
                  clearInterval(jumpInterval);

                  // Check heart collisions
                  hearts.forEach((heart, index) => {
                    if (
                      !heart.collected &&
                      Math.abs(heart.x - prev.x) < 50 &&
                      Math.abs(groundLevel - heart.y - prev.y) < 50
                    ) {
                      collectHeart(index);
                    }
                  });

                  return { ...prev, y: 0 };
                }
              });
            }, 50);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hearts, isJumping, showMessage, heartsCollected, dayTransition]);

  // Handle day/night transition
  useEffect(() => {
    if (dayTransition) {
      const transitionInterval = setInterval(() => {
        // Update sun position (rising)
        setSunPosition(prev => {
          const newOpacity = Math.min(1, prev.opacity + 0.05);
          return { ...prev, opacity: newOpacity };
        });
        
        // Update moon position (setting)
        setMoonPosition(prev => {
          const newOpacity = Math.max(0, prev.opacity - 0.05);
          const newTop = prev.top - 1;
          return { top: newTop, left: prev.left, opacity: newOpacity };
        });
        
        // Update stars opacity separately
        setStarsOpacity(prev => Math.max(0, prev - 0.02));
        
        // Update sky color from black to pink-200 (#fbcfe8)
        setSkyColor(prev => {
          // Target pink-200 in Tailwind is #fbcfe8 (RGB: 251, 207, 232)
          const rgbMatch = prev.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (rgbMatch) {
            const r = Math.min(251, parseInt(rgbMatch[1]) + 8); // Target 251
            const g = Math.min(207, parseInt(rgbMatch[2]) + 7); // Target 207
            const b = Math.min(232, parseInt(rgbMatch[3]) + 8); // Target 232
            return `rgb(${r}, ${g}, ${b})`;
          }
          return prev;
        });
        
        // Gradually show princess
        setPrincessOpacity(prev => {
          const newOpacity = Math.min(1, prev + 0.05);
          if (newOpacity >= 1) {
            setShowPrincess(true);
            // Simplified: Show chat bubbles and final heart as soon as princess appears
            setShowChatBubbles(true);
            setShowFinalHeart(true);
            clearInterval(transitionInterval);
          }
          return newOpacity;
        });
      }, 100);
      
      return () => clearInterval(transitionInterval);
    }
  }, [dayTransition]);

  // Character bouncing animation
  useEffect(() => {
    if (!isJumping) {
      const bounceInterval = setInterval(() => {
        setPlayerPosition((prev) => ({
          ...prev,
          y: prev.y === 0 ? 5 : 0, // Small up/down motion
        }));
      }, 500);

      return () => clearInterval(bounceInterval);
    }
  }, [isJumping]);

  // Collect a heart
  const collectHeart = (index) => {
    const newHearts = [...hearts];
    if (!newHearts[index].collected) {
      newHearts[index].collected = true;
      setHearts(newHearts);
      setHeartsCollected((prev) => prev + 1);
      setCurrentMessage(heartMessages[index]);
      setShowMessage(true);
    }
  };

  // Animation for floating hearts from chat bubbles
  const createFloatingHearts = (sourceX, sourceY) => {
    // Create 3-5 hearts with random paths
    const count = Math.floor(Math.random() * 3) + 3;
    const newHearts = [];
    
    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: sourceX,
        y: sourceY,
        endX: sourceX + (Math.random() * 100 - 50), // Random end X position
        endY: sourceY - 100 - Math.random() * 50, // Always float upward
        scale: 0.5 + Math.random() * 0.5, // Random size
        opacity: 1,
      });
    }
    
    setFloatingHearts(prev => [...prev, ...newHearts]);
    
    // Remove these hearts after animation completes
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 2000);
  };

  // Continue button handler
  const handleContinue = () => {
    setShowMessage(false);
    if (heartsCollected === 3 && !dayTransition) {
      setDayTransition(true);
    }
  };

  // Next step button handler
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
    // Add any specific logic for each step transition here
    // For example, you could change scenes, show new characters, etc.
  };
  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      ref={gameContainerRef}
      style={{ backgroundColor: skyColor, transition: 'background-color 1s ease' }}
    >
      {/* Sky with stars */}
      <div className="absolute top-0 w-full right-0">
        <Image
          src={star}
          alt="stars"
          width={2000}
          objectFit="cover"
          style={{ opacity: starsOpacity }}
        />
      </div>

      {/* Moon */}
      <div 
        className="absolute transition-all duration-500"
        style={{
          top: `${moonPosition.top}rem`,
          left: `${moonPosition.left}rem`,
          opacity: moonPosition.opacity
        }}
      >
        <Image
          src={moon}
          alt="moon"
          height={100}
          width={100}
        />
      </div>

      {/* Sun - opposite side from moon */}
      <div 
        className="absolute transition-all duration-500"
        style={{
          top: `${sunPosition.top}rem`,
          right: `${sunPosition.right}rem`,
          opacity: sunPosition.opacity
        }}
      >
        <Image
          src={sun}
          alt="sun"
          height={80}
          width={80}
        />
      </div>

      {/* Ground/Grass */}
      <div className="w-full flex absolute bottom-0">
        {' '}
        <Image
          src={grass}
          alt="grass"
          className="w-1/2 h-1/3 object-cover"
        />{' '}
        <Image
          src={grass}
          alt="grass"
          className="w-1/2 h-1/3 object-cover"
        />{' '}
      </div>

      {/* Floating hearts animation */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl"
          initial={{ 
            x: heart.x, 
            y: heart.y, 
            scale: heart.scale,
            opacity: heart.opacity 
          }}
          animate={{ 
            x: heart.endX, 
            y: heart.endY, 
            opacity: 0 
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Hearts */}
      {hearts.map(
        (item) =>
          !item.collected && (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: item.x,
                bottom: groundLevel + item.y,
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Image
                src={heart}
                alt="heart"
                height={40}
                width={40}
              />
            </motion.div>
          ),
      )}

      {/* Princess (gradually appears after collecting all hearts) */}
      <motion.div 
        className="absolute right-[500px] bottom-32 transition-opacity duration-1000 "
        style={{ opacity: princessOpacity }}
        animate={{
          y: [0, -5, 0], // Same bouncing animation as character
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        
        <Image
          src={princess}
          alt="princess"
          height={120}
          width={80}
        />

        {/* Chat bubble for princess - with gradient background */}
        {showChatBubbles && (
          <motion.div 
            className="absolute -top-16 right-0 rounded-lg overflow-hidden shadow-md z-50 cursor-pointer" 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => createFloatingHearts(princessPosition - 20, groundLevel + 160)}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-pink-500 opacity-90"></div>
            
            {/* Falling hearts effect */}
            <FallingHearts />
            
            {/* Text content */}
            <div className="relative z-10 p-3 text-white font-love text-[22px] font-semibold">
              Pauly
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Character - Làm nhân vật cao hơn bằng cách thay đổi kích thước */}
      <motion.div
        className="absolute bottom-0"
        style={{
          left: playerPosition.x,
          bottom: groundLevel + playerPosition.y,
          transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',  
        }}
        animate={{
          y: isJumping 
            ? [-50, -100, -50, 0] 
            : [0, -5, 0], // Always animate
        }}
        transition={{
          duration: isJumping ? 0.8 : 1,
          repeat: isJumping ? 0 : Infinity,
        }}
      >
        <Image
          src={character}
          alt="character"
          height={500}  // Tăng chiều cao từ 200 lên 220
          width={65} 
          style={{
            transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',  
          }}
          // Tăng chiều rộng từ 60 lên 65
        />

        {/* Chat bubble for character - với gradient background */}
        {showChatBubbles && (
          <motion.div 
            className="absolute -top-16 left-0 rounded-lg overflow-hidden shadow-md z-50 cursor-pointer" 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => createFloatingHearts(playerPosition.x + 20, groundLevel + 160)}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-pink-500 opacity-90"></div>
            
            {/* Falling hearts effect */}
            <FallingHearts />
            
            {/* Text content */}
            <div className="relative z-10 p-3 text-white font-love text-[22px] font-semibold">
              Daisieee
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Heart between character and princess */}
      {showFinalHeart && (
        <motion.div
          className="absolute z-40"
          style={{
            left: (playerPosition.x + princessPosition - 60) / 2,
            bottom: groundLevel + 60
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            y: [0, -10, 0],
           }}
          transition={{ 
            scale: { duration: 0.5 },
            y: { repeat: Infinity, duration: 1.5 } 
          }}
        >
          <Image
            src={heart}
            alt="heart"
            height={40}
            width={40}
          />
        </motion.div>
      )}

      {/* Message overlay */}
      {showMessage && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <p className="text-lg mb-4">{currentMessage}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Heart counter */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-2 rounded-lg flex items-center">
        <Image
          src={heart}
          alt="heart icon"
          height={20}
          width={20}
        />
        <span className="ml-2 font-bold">{heartsCollected}/3</span>
      </div>
      {/* Next step button - Only shown after chat bubbles appear */}
      {showChatBubbles && (
        <div className="absolute bottom-4 right-4">
          <button 
            className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-colors flex items-center"
            onClick={handleNextStep}
          >
            <span>Next Step</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded-lg text-sm">
        Use arrow keys to move ← → and jump ↑
      </div>
    </div>
  );
}