'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Login,
  MultipleChoice,
  OurStory,
  StoryTour,
  WelcomeBack,
} from '@/components';
import { Howl } from 'howler';
const sound = new Howl({
  src: ['/music.mp3'],
  loop: true,
  autoplay: false,
});

export function HomeMain() {

  const [currentStep, setCurrentStep] = useState(1);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  useEffect(() => {
    if (currentStep === 5) {
      sound.play();
    } else {
      sound.stop();
    }
    
    return () => {
      sound.stop();
    };
  }, [currentStep]);
  useEffect(() => {
    switch (currentStep) {
      case 1:
        setBackgroundStyle({
          background: 'black',
        });
        break;
      case 2:
        setBackgroundStyle({
          background: 'linear-gradient(135deg, #000000 60%, #ff69b4 120%)',
        });
        break;
      case 3:
        setBackgroundStyle({
          background: 'linear-gradient(135deg, #000000 40%, #ff69b4 100%)',
        });
        break;
      case 4:
        setBackgroundStyle({
          background: 'linear-gradient(135deg, #000000 20%, #ff69b4 80%)',
        });
        break;
      case 5:
        setBackgroundStyle({
          background:
            'radial-gradient(circle at 30% 30%, #ff8dc6 0%, #ff69b4 40%, #ff4da6 80%)',
          boxShadow: 'inset 0 0 100px rgba(255, 255, 255, 0.3)',
        });
        break;
      default:
        setBackgroundStyle({
          background: 'black',
        });
    }
  }, [currentStep]);

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <Login setCurrentStep={setCurrentStep} />;
      case 2:
        return <MultipleChoice setCurrentStep={setCurrentStep} />;
      case 3:
        return <WelcomeBack setStep={setCurrentStep} />;
      case 4:
        return <StoryTour setCurrentStep={setCurrentStep} />;
      case 5:
        return <OurStory />;
      default:
        return null;
    }
  };

  return (
    <>
      {currentStep === 6 ? (
        <div className="w-full">{renderContent()}</div>
      ) : (
        <div
          className="min-h-screen w-full"
          style={backgroundStyle}
        >
          {/* Background layer with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`w-full h-full absolute top-0 left-0`}
            />
          </AnimatePresence>
          
          {/* Content layer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="z-10 relative w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}