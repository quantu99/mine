import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import sky from '../assets/image/letter.jpg';
import { motion, useInView } from 'framer-motion';

export function LoveLetter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  
  // Letter content - each line will be typed out completely before moving to the next
  const letterContent = [
    "Em yêu dấu,",
    "",
    "Anh viết những dòng này khi trời đã về khuya, khi những vì sao lấp lánh trên bầu trời như ánh mắt em ngày đầu ta gặp nhau.",
    "",
    "Đã một năm, mười hai tháng, năm mươi hai tuần, ba trăm sáu mươi sáu ngày kể từ khi chúng ta tìm thấy nhau. Mỗi khoảnh khắc bên em đều là điều quý giá nhất trong cuộc đời anh.",
    "",
    "Em có biết không, mỗi sáng thức dậy, điều đầu tiên anh nghĩ đến là nụ cười của em. Mỗi đêm trước khi ngủ, hình ảnh cuối cùng trong tâm trí anh vẫn là em.",
    "",
    "Tình yêu của chúng ta như một cây non đã vững chắc bén rễ, và anh mong được tiếp tục vun đắp, chăm sóc để cây tình yêu ấy mãi xanh tươi, đơm hoa kết trái.",
    "",
    "Cảm ơn em vì đã là người đồng hành tuyệt vời nhất. Cảm ơn vì những giây phút hạnh phúc, và cả những lúc khó khăn ta cùng vượt qua.",
    "",
    "Anh yêu em nhiều lắm, hôm qua, hôm nay và mãi mãi về sau."
  ];

  // Typing animation logic
  useEffect(() => {
    if (!isInView) return;
    
    // If we've completed all lines, stop
    if (currentLineIndex >= letterContent.length) return;
    
    // Get current line
    const currentLine = letterContent[currentLineIndex];
    
    // If we've completed the current line
    if (currentCharIndex >= currentLine.length) {
      // Add current line to completed lines
      setCompletedLines(prev => [...prev, currentLine]);
      // Move to next line
      setCurrentLineIndex(prev => prev + 1);
      // Reset char index
      setCurrentCharIndex(0);
      return;
    }
    
    // Type next character with variable speed (empty lines type faster)
    const typingSpeed = currentLine.length === 0 ? 10 : 50;
    
    const timer = setTimeout(() => {
      setCurrentCharIndex(prev => prev + 1);
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [isInView, currentLineIndex, currentCharIndex, letterContent]);

  // Check if all lines have been typed
  const isTypingComplete = currentLineIndex >= letterContent.length;

  return (
    <div
      className="relative w-full overflow-hidden min-h-screen"
      ref={containerRef}
    >
      {/* Background image */}
      <div className="absolute w-full h-full">
        <Image
          src={sky}
          className="w-full h-full object-cover brightness-50"
          alt="Sky background"
          priority={true}
        />
      </div>

      {/* Letter container */}
      <div className="relative z-10 py-16 md:py-24 flex justify-end">
        <motion.div 
          className="w-11/12 md:w-3/4 lg:w-1/2 mx-4 md:mx-8 lg:mx-16 bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            minHeight: '70vh',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Paper content with consistent height */}
          <div className="h-full flex flex-col font-handwriting">
            {/* Letter content area - takes most of the space */}
            <div className="flex-grow space-y-4">
              {/* Completed lines */}
              {completedLines.map((line, index) => (
                <p key={`completed-${index}`} className="text-lg md:text-xl leading-relaxed">
                  {line}
                </p>
              ))}
              
              {/* Currently typing line */}
              {currentLineIndex < letterContent.length && (
                <p className="text-lg md:text-xl leading-relaxed">
                  {letterContent[currentLineIndex].substring(0, currentCharIndex)}
                  <span className="animate-pulse">|</span>
                </p>
              )}
            </div>

            {/* Signature area - always at the bottom */}
            <div className="mt-auto pt-8">
              {isTypingComplete && (
                <motion.div 
                  className="text-right text-pink-300 italic text-[30px] font-love"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5,
                    ease: "easeOut" 
                  }}
                >
                  Kẻ luôn thầm thương trộm nhớ em
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}