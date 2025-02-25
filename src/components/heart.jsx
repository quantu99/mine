// components/HeartCursorEffect.jsx
'use client';

import React, { useState, useEffect } from 'react';

export const HeartCursorEffect = ({ children }) => {
  const [hearts, setHearts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  
  // Tạo trái tim mới
  const createHeart = (x, y) => {
    const id = Date.now();
    const size = Math.random() * 10 + 10; // Kích thước ngẫu nhiên từ 10-20px
    const color = `hsl(${Math.floor(Math.random() * 30) + 340}, 100%, 65%)`; // Màu hồng ngẫu nhiên
    
    setHearts(prev => [...prev, { id, x, y, size, opacity: 1, color }]);
    
    // Xóa trái tim sau khi animation hoàn thành
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 1500);
  };

  // Xử lý di chuyển chuột
  const handleMouseMove = (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    setMousePosition({ x: currentX, y: currentY });
    
    // Kiểm tra nếu chuột đang di chuyển
    const diffX = Math.abs(currentX - lastPosition.x);
    const diffY = Math.abs(currentY - lastPosition.y);
    
    if (diffX > 5 || diffY > 5) {
      setIsMoving(true);
      setLastPosition({ x: currentX, y: currentY });
      
      // Chỉ tạo trái tim nếu chuột di chuyển đủ xa
      if (Math.random() < 0.3) { // 30% cơ hội tạo trái tim để không quá dày đặc
        createHeart(currentX, currentY);
      }
    } else {
      setIsMoving(false);
    }
  };

  // Xử lý chạm di chuyển trên thiết bị di động
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      setMousePosition({ x: currentX, y: currentY });
      
      // Kiểm tra nếu ngón tay đang di chuyển
      const diffX = Math.abs(currentX - lastPosition.x);
      const diffY = Math.abs(currentY - lastPosition.y);
      
      if (diffX > 5 || diffY > 5) {
        setIsMoving(true);
        setLastPosition({ x: currentX, y: currentY });
        
        // Chỉ tạo trái tim nếu di chuyển đủ xa
        if (Math.random() < 0.3) {
          createHeart(currentX, currentY);
        }
      } else {
        setIsMoving(false);
      }
    }
  };

  // Cập nhật animation
  useEffect(() => {
    if (hearts.length === 0) return;
    
    const intervalId = setInterval(() => {
      setHearts(prev => 
        prev.map(heart => ({
          ...heart,
          y: heart.y - 2, // Bay lên
          size: Math.max(0, heart.size - 0.2), // Giảm dần kích thước
          opacity: Math.max(0, heart.opacity - 0.02) // Mờ dần
        }))
      );
    }, 20);
    
    return () => clearInterval(intervalId);
  }, [hearts.length]);

  // Đăng ký event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lastPosition]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Nội dung chính */}
      {children}
      
      {/* Hiệu ứng trái tim */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="absolute pointer-events-none z-50"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            opacity: heart.opacity,
            transform: `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`, // Xoay ngẫu nhiên
          }}
        >
          <svg 
            width={heart.size} 
            height={heart.size} 
            viewBox="0 0 24 24" 
            fill={heart.color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};