import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import sky from '../assets/image/love-tree.jpg';
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  useScroll,
} from 'framer-motion';

export function CountUp() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform for parallax effect - applied to content instead of background
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const items = [
    { value: 1, label: 'năm' },
    { value: 12, label: 'tháng' },
    { value: 52, label: 'tuần(2 ngày)' },
    { value: 366, label: 'ngày' },
    { value: 8784, label: 'giờ' },
    { value: 527040, label: 'phút' },
    { value: 31622400, label: 'giây' },
  ];

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Static background */}
      <div className="absolute w-full h-full">
        <Image
          src={sky}
          className="w-full h-full object-cover brightness-50"
          alt="Sky background"
          priority={true}
        />
      </div>

      {/* Parallax content container */}
      <motion.div
        className="relative z-10 py-16 md:py-24"
        style={{ y: contentY }}
        ref={contentRef}
      >
        <div className="container mx-auto px-4">
          <h2 className="font-italia text-4xl md:text-5xl lg:text-6xl text-white text-center mb-10">
            Tụi mình đã yêu nhau bao lâu?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((item, index) => (
              <CountUpItem
                key={index}
                end={item.value}
                label={item.label}
                isInView={isInView}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// CountUpItem component to animate individual counters
const CountUpItem = ({ end, label, isInView, index }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Format number with commas as thousands separators
  const formattedNumber = useTransform(rounded, (value) => {
    return formatNumber(value);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { duration: 2 });
      return controls.stop;
    }
  }, [count, end, isInView]);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <motion.div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {formattedNumber}
      </motion.div>
      <div className="text-pink-300">{label}</div>
    </motion.div>
  );
};

// Function to format numbers with comma separators
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Custom animate function
function animate(value, to, options = { duration: 2 }) {
  const startTime = performance.now();
  const initialValue = value.get();

  function update() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / (options.duration * 1000), 1);
    const easedProgress = easeOutExpo(progress);

    const newValue = initialValue + (to - initialValue) * easedProgress;
    value.set(newValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();

  return {
    stop: () => {}, // Simplified stop function
  };
}

// Easing function for smooth animation
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
