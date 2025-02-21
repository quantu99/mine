'use client';
import React, { useState } from 'react';

const TreeWithImageLeaves = () => {
  // Dữ liệu mẫu cho các tấm ảnh trên lá
  // Trong thực tế, bạn sẽ thay thế các đường dẫn này bằng ảnh thật
  const leafImages = [
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
  ];

  // State để theo dõi lá được hover
  const [hoveredLeaf, setHoveredLeaf] = useState(null);

  // Tạo các vị trí lá ngẫu nhiên nhưng hợp lý xung quanh thân cây
  const generateLeafPositions = () => {
    const positions = [];

    // Các vị trí cho bên trái của cây
    positions.push({ x: 80, y: 180, rotation: -15, scale: 1.2 });
    positions.push({ x: 50, y: 240, rotation: -25, scale: 1.1 });
    positions.push({ x: 120, y: 150, rotation: -5, scale: 1 });
    positions.push({ x: 90, y: 300, rotation: -20, scale: 0.9 });
    positions.push({ x: 130, y: 250, rotation: -10, scale: 1.1 });
    positions.push({ x: 60, y: 350, rotation: -30, scale: 1 });

    // Các vị trí cho bên phải của cây
    positions.push({ x: 270, y: 180, rotation: 15, scale: 1.2 });
    positions.push({ x: 300, y: 240, rotation: 25, scale: 1.1 });
    positions.push({ x: 230, y: 150, rotation: 5, scale: 1 });
    positions.push({ x: 260, y: 300, rotation: 20, scale: 0.9 });
    positions.push({ x: 220, y: 250, rotation: 10, scale: 1.1 });
    positions.push({ x: 290, y: 350, rotation: 30, scale: 1 });

    return positions;
  };

  const leafPositions = generateLeafPositions();

  // Hàm hiển thị một lá với ảnh bên trong
  const renderLeaf = (position, index) => {
    const isHovered = hoveredLeaf === index;

    return (
      <g
        key={index}
        transform={`translate(${position.x}, ${position.y}) rotate(${position.rotation}) scale(${position.scale})`}
        onMouseEnter={() => setHoveredLeaf(index)}
        onMouseLeave={() => setHoveredLeaf(null)}
        className="cursor-pointer transition-all duration-300"
        style={{
          transform: isHovered
            ? `translate(${position.x}px, ${position.y}px) rotate(${
                position.rotation
              }deg) scale(${position.scale * 1.2})`
            : `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg) scale(${position.scale})`,
        }}
      >
        {/* Hình dạng lá */}
        <path
          d="M0,0 C5,-10 20,-15 30,-5 C40,5 30,15 20,20 C10,25 -10,15 -5,5 C0,-5 -5,-10 0,0 Z"
          fill="#4CAF50"
          stroke="#2E7D32"
          strokeWidth="1"
        />

        {/* Clip path cho ảnh */}
        <clipPath id={`leaf-clip-${index}`}>
          <path d="M0,-2 C5,-10 15,-13 25,-5 C35,3 25,12 15,16 C5,20 -8,12 -3,3 C0,-3 -3,-7 0,-2 Z" />
        </clipPath>

        {/* Ảnh trong lá */}
        <image
          href={leafImages[index % leafImages.length]}
          x="-15"
          y="-15"
          height="30"
          width="30"
          clipPath={`url(#leaf-clip-${index})`}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    );
  };

  return (
    <div className="w-full h-screen bg-sky-100 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 600"
        width="100%"
        height="100%"
        className="max-w-2xl"
      >
        {/* Nền */}
        <rect
          x="0"
          y="0"
          width="400"
          height="600"
          fill="transparent"
        />

        {/* Thân cây */}
        <path
          d="M175,550 C170,450 160,400 190,300 C195,250 185,220 175,180 L175,550 Z"
          fill="#8B4513"
        />
        <path
          d="M175,550 C180,450 190,400 170,300 C165,250 175,220 175,180 L175,550 Z"
          fill="#A0522D"
        />

        {/* Nhánh chính */}
        <path
          d="M175,180 C200,170 230,160 250,130"
          fill="none"
          stroke="#8B4513"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M175,180 C150,170 120,160 100,130"
          fill="none"
          stroke="#8B4513"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Nhánh phụ */}
        <path
          d="M250,130 C270,120 290,100 300,80"
          fill="none"
          stroke="#A0522D"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M100,130 C80,120 60,100 50,80"
          fill="none"
          stroke="#A0522D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Các nhánh nhỏ hơn */}
        <path
          d="M140,220 C120,200 100,200 80,190"
          fill="none"
          stroke="#A0522D"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M210,220 C230,200 250,200 270,190"
          fill="none"
          stroke="#A0522D"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Hiển thị các lá với ảnh */}
        {leafPositions.map((position, index) => renderLeaf(position, index))}
      </svg>
    </div>
  );
};

export default TreeWithImageLeaves;
