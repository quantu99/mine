'use client';
import React, { useState, useEffect } from 'react';

export const RippleEffect = ({ children }) => {
  const [ripples, setRipples] = useState([]);
  const [textEffects, setTextEffects] = useState([]);

  // Random text options
  const randomTexts = [
    'Anh yêu em',
    'Em bé ơi',
    'Hôn anh đi',
    'Yêu nhiều lắm',
    'Cục cưng ơi',
    'Bé yêu à',
    'Nhớ em quá',
    'Nắm tay nhé',
    'Bé ngoan nè',
    'Mãi bên em',
    'Em là nhất',
    'Gần bên anh',
    'Ngủ ngon nha',
    'Dậy đi em',
    'Thơm một cái',
    'Cười lên đi',
    'Chờ anh nhé',
    'Mơ đẹp nha',
    'Ôm một cái',
    'Hãy tin anh',
    'My love',
    'My baby',
    'I miss you',
    'Kiss me',
    'Love you',
    'Be mine',
    'Hug me',
    'With you',
    'Forever us',
    'My angel',
    'Darling ơi',
    'You & me',
    'Hold me',
    'Little love',
    'Babe ơi',
    'Sweetheart',
    'Mi amor',
    'Mon amour',
    'Ti amo',
    'Je t’aime',
    'Mon bébé',
    'Mon trésor',
    'Dolce vita',
    'Cuore mio',
    'Sempre tu',
    'Mon chéri',
    'Chéri(e) ơi',
    'Petite étoile',
    'Bella mia',
    'Mio amore',
    'Tiamo tanto',
    'Bacio per te',
    'Sei bellissima',
    'Amore mio',
    'Avec toi',
    'Per sempre',
    'Sei dolce',
    'Angioletto',
    'Sempre insieme',
    'Chuchoter moi',
    'Bisous bébé',
    'Mon cœur',
    'You’re mine',
    'Mi corazón',
    'Eres preciosa',
    'Hug me tight',
    'Miss you babe',
    'Sognando te',
    'Doux rêves',
    'Dream of me',
    'Mi vida',
    'My everything',
    'Baby boo',
    'You’re cute',
    'Cuddle me',
    'Fall for you',
    'Come to me',
    'Stay with me',
    'Be with me',
    'Sunshine của anh',
    'Little princess',
    'Moonlight baby',
    'Star of mine',
    'Nhớ nhung quá',
    'Mộng mơ cùng em',
    'Hôn má anh',
    'Để anh ôm',
    'Nhẹ nhàng thôi',
    'Cưng lắm đó',
    'Mãi là em',
    'Đừng rời xa',
    'Bên nhau mãi',
    'Yêu không?',
    'Bé có thương?',
    'Nói yêu anh',
    'Gật đầu đi',
    'Thương nhiều không?',
    'Rất yêu em',
    'Bé dễ thương',
    'Tình anh đó',
    'Không thể xa',
    'My only one',
  ];
  const handleClick = (e) => {
    // Get click position
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    // Create unique ID for new ripple
    const id = new Date().getTime();

    // Add new ripple to list
    setRipples((prev) => [...prev, { id, x, y, size: 0, opacity: 0.7 }]);

    // Add random text effect
    const text = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    setTextEffects((prev) => [
      ...prev,
      {
        id,
        x,
        y,
        text,
        opacity: 1,
        directionX: Math.random() * 2 - 1,
        directionY: Math.random() - 1,
      },
    ]);

    // Remove old ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1500);

    // Remove text effect
    setTimeout(() => {
      setTextEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 2000);
  };

  // Update ripple size
  useEffect(() => {
    if (ripples.length === 0) return;

    const intervalId = setInterval(() => {
      setRipples((prev) =>
        prev.map((ripple) => ({
          ...ripple,
          size: ripple.size + 2, // Increase size
          opacity: Math.max(0, ripple.opacity - 0.01), // Gradually reduce opacity
        }))
      );
    }, 10);

    return () => clearInterval(intervalId);
  }, [ripples.length]);

  // Update text effects
  useEffect(() => {
    if (textEffects.length === 0) return;

    const intervalId = setInterval(() => {
      setTextEffects((prev) =>
        prev.map((effect) => ({
          ...effect,
          x: effect.x + effect.directionX * 2,
          y: effect.y + effect.directionY * 3,
          opacity: Math.max(0, effect.opacity - 0.02),
        }))
      );
    }, 20);

    return () => clearInterval(intervalId);
  }, [textEffects.length]);

  return (
    <div
      className="relative w-full min-h-screen bg-transparent touch-none select-none overflow-y-auto"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <div className="absolute  inset-0 flex text-gray-500 text-lg justify-center">
        {children}
      </div>

      {/* Ripple circles */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
        >
          {/* First circle - outer */}
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

          {/* Second circle - middle */}
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

          {/* Third circle - inner */}
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

      {/* Text effects */}
      {textEffects.map((effect) => (
        <div
          key={effect.id}
          className="absolute pointer-events-none text-white text-[24px] font-love font-semibold z-50"
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: effect.opacity,
            textShadow: '0 0 5px rgba(0,0,0,0.8)',
          }}
        >
          {effect.text}
        </div>
      ))}
    </div>
  );
};
