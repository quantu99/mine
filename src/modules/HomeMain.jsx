'use client';
import { Login, MultipleChoice } from '@/components';
import { useState } from 'react';

export function HomeMain() {
  const [currentStep, setCurrentStep] = useState(2);
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <Login setCurrentStep={setCurrentStep} />;
      case 2:
        return <MultipleChoice />;
      default:
        return null;
    }
  };
  return <div className="relative z-50">{renderContent()}</div>;
}
