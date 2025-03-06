'use client';
import Image from 'next/image';
import banner from '../assets/image/rose2.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import "./OurStory.css";

export function OurStory() {
  const textLines = ['Happy', "Our 1 year love's anniversary and late 8/3"];
  const [displayedTexts, setDisplayedTexts] = useState(['', '']);
  const [index, setIndex] = useState(0);
  const [line, setLine] = useState(0);

  // Gallery states
  const [flyingImages, setFlyingImages] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const containerRef = useRef(null);

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

  // Generate flying images with bounce behavior
  useEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const initialImages = galleryImages.map((img) => {
      const startX = Math.random() * (containerRect.width - 100);
      const startY = Math.random() * (containerRect.height - 100);

      return {
        ...img,
        x: startX,
        y: startY,
        vx: Math.random() * 4 - 2, // Random horizontal velocity
        vy: Math.random() * 4 - 2, // Random vertical velocity
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      };
    });

    setFlyingImages(initialImages);
  }, []);

  // Animate flying images with bounce
  useEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const imageSize = 100;

    const animationFrame = requestAnimationFrame(function updateImages() {
      setFlyingImages((prevImages) =>
        prevImages.map((img) => {
          let newX = img.x + img.vx;
          let newY = img.y + img.vy;
          let newVx = img.vx;
          let newVy = img.vy;

          // Bounce off container edges
          if (newX <= 0 || newX >= containerRect.width - imageSize) {
            newVx = -newVx * 0.9; // Reverse and slightly reduce velocity
          }
          if (newY <= 0 || newY >= containerRect.height - imageSize) {
            newVy = -newVy * 0.9; // Reverse and slightly reduce velocity
          }

          return {
            ...img,
            x: Math.max(0, Math.min(newX, containerRect.width - imageSize)),
            y: Math.max(0, Math.min(newY, containerRect.height - imageSize)),
            vx: newVx,
            vy: newVy,
            rotation: img.rotation + 2,
          };
        }),
      );

      requestAnimationFrame(updateImages);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Image click handler
  const handleImageClick = (media) => {
    setSelectedMedia(media);
  };

  // Close popup
  const handleClosePopup = (e) => {
    // Prevent event from propagating
    e.stopPropagation();
    setSelectedMedia(null);
  };

  // Download handler
  const handleDownload = (e) => {
    e.stopPropagation();
    if (selectedMedia) {
      const link = document.createElement('a');
      link.href = selectedMedia.src;
      link.download = `image_${selectedMedia.id}.jpg`;
      link.click();
    }
  };
  return (
    <div className="w-full h-full bg-black">
      <div className="relative w-full md:min-h-[800px] lg:min-h-screen">
        <Image
          src={banner}
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
      <div className='heart-shape' />
    </div>
  );
}
