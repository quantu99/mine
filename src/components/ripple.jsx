'use client';
import React, { useState, useEffect } from 'react';

export const RippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    // Lấy vị trí click
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    // Tạo ID duy nhất cho ripple mới
    const id = new Date().getTime();

    // Thêm ripple mới vào danh sách
    setRipples((prev) => [...prev, { id, x, y, size: 0, opacity: 0.7 }]);

    // Xóa ripple cũ sau khi hoàn thành animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1500);
  };

  // Cập nhật kích thước ripple
  useEffect(() => {
    if (ripples.length === 0) return;

    const intervalId = setInterval(() => {
      setRipples((prev) =>
        prev.map((ripple) => ({
          ...ripple,
          size: ripple.size + 2, // Tăng kích thước
          opacity: Math.max(0, ripple.opacity - 0.01), // Giảm dần độ mờ
        })),
      );
    }, 10);

    return () => clearInterval(intervalId);
  }, [ripples.length]);

  return (
    <div
      className="relative h-screen w-full bg-blue-100 overflow-hidden touch-none select-none"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
        Click hoặc chạm vào bất kỳ đâu để tạo hiệu ứng gợn sóng
      </div>

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
        >
          {/* Vòng tròn đầu tiên */}
          <div
            className="absolute rounded-full border-2 border-pink-500"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              transform: 'translate(-50%, -50%)',
              opacity: ripple.opacity,
            }}
          />

          {/* Vòng tròn thứ hai */}
          <div
            className="absolute rounded-full border-2 border-pink-400"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${Math.max(0, ripple.size - 15)}px`,
              height: `${Math.max(0, ripple.size - 15)}px`,
              transform: 'translate(-50%, -50%)',
              opacity: ripple.opacity + 0.1,
            }}
          />

          {/* Vòng tròn thứ ba */}
          <div
            className="absolute rounded-full border-2 border-pink-300"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${Math.max(0, ripple.size - 30)}px`,
              height: `${Math.max(0, ripple.size - 30)}px`,
              transform: 'translate(-50%, -50%)',
              opacity: ripple.opacity + 0.2,
            }}
          />
        </div>
      ))}
    </div>
  );
};
