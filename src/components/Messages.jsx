import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import rose2 from '../assets/image/rose2.jpg';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export function Messages() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const IMAGE_ARR = [
    {
      id: 1,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
    {
      id: 2,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
    {
      id: 3,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
    {
      id: 4,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
    {
      id: 5,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
    {
      id: 6,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
    {
      id: 7,
      title: 'ABC',
      description: 'xyz',
      image: rose2,
    },
  ];

  // Handle wheel events to control scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollThreshold = 500; // ms between scroll events

    const handleWheel = (e) => {
      const currentTime = new Date().getTime();
      
      if (currentTime - lastScrollTime > scrollThreshold) {
        if (e.deltaY > 0 && activeIndex < IMAGE_ARR.length - 1) {
          // Scroll down
          setActiveIndex(prev => prev + 1);
        } else if (e.deltaY < 0 && activeIndex > 0) {
          // Scroll up
          setActiveIndex(prev => prev - 1);
        }
        
        lastScrollTime = currentTime;
      }
      
      e.preventDefault();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, IMAGE_ARR.length]);

  return (
    <div 
      className="h-screen w-full overflow-hidden bg-black relative"
      ref={containerRef}
    >
      {IMAGE_ARR.map((item, index) => (
        <StaircaseItem 
          key={item.id} 
          item={item} 
          index={index}
          isActive={index === activeIndex}
          totalItems={IMAGE_ARR.length}
          activeIndex={activeIndex}
        />
      ))}
    </div>
  );
}

const StaircaseItem = ({ item, index, isActive, totalItems, activeIndex }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false });
  
  // Calculate position based on index and active index
  const getPosition = () => {
    if (index < activeIndex) {
      // Items that have been passed
      return {
        x: '-100vw',
        y: `${(index - activeIndex) * 100}vh`,
        opacity: 0.3,
        scale: 0.8,
      };
    } else if (index > activeIndex) {
      // Items yet to come
      const offset = index - activeIndex;
      return {
        x: '100vw',
        y: `${offset * 100}vh`,
        opacity: 0.3,
        scale: 0.8,
      };
    } else {
      // Current active item
      return {
        x: '0vw',
        y: '0vh',
        opacity: 1,
        scale: 1,
      };
    }
  };

  // Determine whether the movement should be horizontal or vertical for this step
  const isHorizontalStep = index % 2 === 1;
  
  // Customize the transition based on the step type
  const getCustomTransition = () => {
    // Base timing
    const duration = 0.8;
    
    // For active items becoming visible
    if (index === activeIndex) {
      return {
        duration: duration,
        type: "spring",
        stiffness: 50,
        damping: 14
      };
    }
    
    // For items moving out or waiting
    return {
      duration: duration,
      ease: "easeInOut"
    };
  };

  // Get diagonal position (combination of horizontal and vertical)
  const getDiagonalPosition = () => {
    const position = getPosition();
    
    // If this is a horizontal step, adjust the movement to be more horizontal
    if (isHorizontalStep) {
      if (index < activeIndex) {
        return {
          ...position,
          x: '-130vw',
          y: `${(index - activeIndex) * 50}vh`, // Less vertical movement
        };
      } else if (index > activeIndex) {
        return {
          ...position,
          x: '130vw', // More horizontal movement
          y: `${(index - activeIndex) * 50}vh`, // Less vertical movement
        };
      }
    }
    
    // For vertical steps, adjust to be more vertical
    else {
      if (index < activeIndex) {
        return {
          ...position,
          x: '-50vw', // Less horizontal movement
          y: `${(index - activeIndex) * 130}vh`, // More vertical movement
        };
      } else if (index > activeIndex) {
        return {
          ...position,
          x: '50vw', // Less horizontal movement
          y: `${(index - activeIndex) * 130}vh`, // More vertical movement
        };
      }
    }
    
    return position;
  };
  
  const position = getDiagonalPosition();

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      ref={itemRef}
      initial={{ x: index === 0 ? 0 : '100vw', y: index === 0 ? 0 : '100vh', opacity: index === 0 ? 1 : 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: position.opacity,
        scale: position.scale,
      }}
      transition={getCustomTransition()}
    >
      <motion.div
        className={`flex gap-10 ${
          item.id % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
        } bg-black/60 p-6 rounded-lg backdrop-blur-sm max-w-4xl mx-auto`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.7 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="relative w-[100px] h-[100px] border border-[#FC5A8D] border-dotted"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ 
            scale: isActive ? 1 : 0.8,
            rotate: isActive ? 0 : -5,
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image
            src={item.image}
            width={100}
            height={100}
            className="object-cover absolute top-0 left-0"
            alt={`Image ${item.id}`}
          />
        </motion.div>
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: item.id % 2 === 0 ? -20 : 20 }}
          animate={{ 
            opacity: isActive ? 1 : 0.7,
            x: isActive ? 0 : (item.id % 2 === 0 ? -10 : 10)
          }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-white text-xl font-bold">{item.title}</h2>
          <p className="text-gray-300">{item.description}</p>
        </motion.div>
      </motion.div>
      
      {/* Navigation indicator */}
    </motion.div>
  );
}