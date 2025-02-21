'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Calendar2024 = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to March

  const months = [
    { id: 1, name: 'Tháng 1', days: 31 },
    { id: 2, name: 'Tháng 2', days: 29 }, // 2024 is leap year
    { id: 3, name: 'Tháng 3', days: 31 },
    { id: 4, name: 'Tháng 4', days: 30 },
    { id: 5, name: 'Tháng 5', days: 31 },
    { id: 6, name: 'Tháng 6', days: 30 },
    { id: 7, name: 'Tháng 7', days: 31 },
    { id: 8, name: 'Tháng 8', days: 31 },
    { id: 9, name: 'Tháng 9', days: 30 },
    { id: 10, name: 'Tháng 10', days: 31 },
    { id: 11, name: 'Tháng 11', days: 30 },
    { id: 12, name: 'Tháng 12', days: 31 },
  ];

  // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month) => {
    return new Date(2024, month - 1, 1).getDay();
  };

  // Beating heart component for March calendar background
  const BeatingHeart = () => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#E91E63"
          animate={{
            fill: ['#E91E63', '#FF4081', '#E91E63'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        />
      </motion.svg>
    </motion.div>
  );

  // Create calendar grid
  const renderCalendarDays = (month) => {
    const firstDay = getFirstDayOfMonth(month);
    const daysInMonth = months.find((m) => m.id === month).days;
    const days = [];

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-10 w-10"
        ></div>,
      );
    }

    // Add cells for each day
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-pink-100 cursor-pointer transition-colors"
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  // Month selector
  const MonthSelector = () => {
    return (
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {months.map((month) => (
          <button
            key={month.id}
            onClick={() => setSelectedMonth(month.id)}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedMonth === month.id
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {month.name}
          </button>
        ))}
      </div>
    );
  };

  // Calendar header
  const CalendarHeader = () => (
    <div className="grid grid-cols-7 gap-1 mb-2 font-medium text-gray-500">
      <div className="text-center">CN</div>
      <div className="text-center">T2</div>
      <div className="text-center">T3</div>
      <div className="text-center">T4</div>
      <div className="text-center">T5</div>
      <div className="text-center">T6</div>
      <div className="text-center">T7</div>
    </div>
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Lịch 2024
      </h2>

      <MonthSelector />

      <div className="relative mb-4">
        {selectedMonth === 3 && <BeatingHeart />}

        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4 relative z-10">
          {months.find((m) => m.id === selectedMonth).name}, 2024
        </h3>

        <div className="relative z-10">
          <CalendarHeader />

          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays(selectedMonth)}
          </div>
        </div>
      </div>

      {selectedMonth === 3 && (
        <div className="text-center text-sm text-pink-500 mt-4 font-medium">
          Tháng 3 - Tháng của tình yêu và sự khởi đầu mùa xuân
        </div>
      )}
    </div>
  );
};

export default Calendar2024;
