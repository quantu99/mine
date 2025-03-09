'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartCursorEffect,
  Login,
  MultipleChoice,
  OurStory,
  RippleEffect,
  StoryTour,
  WelcomeBack,
} from '@/components';
import { Howl } from 'howler';
import { FairyTale } from '@/components/FairyTale';
const sound = new Howl({
  src: ['/music.mp3'],
  loop: true,
  autoplay: false,
});

export function HomeMain() {
  const [currentStep, setCurrentStep] = useState(2);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  useEffect(() => {
    if (currentStep === 6) {
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
      default:
        setBackgroundStyle({
          background: 'black',
        });
    }
  }, [currentStep]);

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <HeartCursorEffect>
            <RippleEffect>
              <Login setCurrentStep={setCurrentStep} />
            </RippleEffect>
          </HeartCursorEffect>
        );
      case 2:
        return (
          <HeartCursorEffect>
            <RippleEffect>
              <MultipleChoice setCurrentStep={setCurrentStep} />
            </RippleEffect>
          </HeartCursorEffect>
        );
      case 3:
        return (
          <HeartCursorEffect>
            <RippleEffect>
              <WelcomeBack setStep={setCurrentStep} />
            </RippleEffect>
          </HeartCursorEffect>
        );
      case 4:
        return <StoryTour setCurrentStep={setCurrentStep} />;
      case 5:
        return (
          <HeartCursorEffect>
            <RippleEffect>
              <FairyTale setStep={setCurrentStep} />
            </RippleEffect>
          </HeartCursorEffect>
        );
      case 6:
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
