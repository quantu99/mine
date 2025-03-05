'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Download } from 'lucide-react';

// Import all necessary images
import banner from '../assets/image/rose2.jpg';
import heartTree from '../assets/image/heart-tree.png';

// Dynamically import all images from the image directory
const importAll = (r) => {
  return r.keys().map(r);
};

const imageModules = importAll(require.context('../assets/image', false, /\.(png|jpe?g|svg|gif)$/));

// Filter out specific images we don't want in the gallery
const galleryImages = imageModules
  .filter(img => 
    !img.default.src.includes('rose2.jpg') && 
    !img.default.src.includes('heart-tree.png')
  )
  .map((img, index) => ({
    id: index + 1,
    src: img.default.src,
    type: 'image'
  }));

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

    const initialImages = galleryImages.map(img => {
      const startX = Math.random() * (containerRect.width - 100);
      const startY = Math.random() * (containerRect.height - 100);
      
      return {
        ...img,
        x: startX,
        y: startY,
        vx: (Math.random() * 4 - 2), // Random horizontal velocity
        vy: (Math.random() * 4 - 2), // Random vertical velocity
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5
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
      setFlyingImages(prevImages => 
        prevImages.map(img => {
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
            rotation: img.rotation + 2
          };
        })
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
    <div className="w-full">
      {/* Banner Section */}
      <div className="header relative w-full h-screen min-h-[600px]">
        <Image
          src={banner}
          fill
          className="w-full h-full object-cover brightness-50"
          alt="Banner"
          priority
        />
        <motion.div
          className="font-italia absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white text-center text-[clamp(24px,4vw,50px)] px-4 gap-4 flex flex-col"
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
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTexts[1]}
          </motion.span>
        </motion.div>
      </div>

      {/* Heart Tree Section with Flying Images */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen min-h-[600px]"
      >
        <Image
          src={heartTree}
          fill
          className="w-full h-full object-cover"
          alt="Heart Tree"
        />

        {/* Flying Images */}
        {flyingImages.map((img) => (
          <div
            key={img.id}
            className="absolute cursor-pointer"
            style={{
              left: `${img.x}px`,
              top: `${img.y}px`,
              transform: `rotate(${img.rotation}deg) scale(${img.scale})`,
              width: '100px',
              height: '100px'
            }}
            onClick={() => handleImageClick(img)}
          >
            <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={img.src}
                width={100}
                height={100}
                alt={`Flying Image ${img.id}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Media Popup */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-80 z-[99999999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePopup}
          >
            <motion.div 
              className="relative bg-white rounded-lg max-w-4xl w-full h-[90vh] "
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={handleClosePopup}
                className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                <X size={24} />
              </button>

              {/* Download Button */}
              <button 
                onClick={handleDownload}
                className="absolute top-4 right-16 z-10 bg-green-500 text-white rounded-full p-2 hover:bg-green-600"
              >
                <Download size={24} />
              </button>

              {/* Media Content */}
              <div className="w-full h-full flex items-center justify-center z-[99999999]">
                <Image
                  src={selectedMedia.src}
                  alt={`Image ${selectedMedia.id}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}