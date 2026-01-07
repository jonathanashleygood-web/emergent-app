import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '../context/FormContext';
import Logo from './Logo';

const stepImages = {
  1: {
    url: 'https://images.unsplash.com/photo-1691522508832-14482bbcefc3?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'European city street architecture',
  },
  2: {
    url: 'https://images.unsplash.com/photo-1761039265583-9489b4246454?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'Luxury hotel room balcony',
  },
  3: {
    url: 'https://images.unsplash.com/photo-1759767119566-e7dad33d540b?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'Safari jeep adventure',
  },
  4: {
    url: 'https://images.unsplash.com/photo-1710028267880-f34d75a5ead6?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'Airplane window view',
  },
  5: {
    url: 'https://images.unsplash.com/photo-1766735325500-adfbea156bac?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'Couple dancing on beach',
  },
  6: {
    url: 'https://images.unsplash.com/photo-1667604946733-c7dd5b992d2e?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'Cozy interior table setting',
  },
  7: {
    url: 'https://images.unsplash.com/photo-1758716768666-2692b302a5e7?crop=entropy&cs=srgb&fm=jpg&q=85',
    alt: 'Modern white resort building',
  },
};

const stepTitles = {
  1: 'Your Trip',
  2: 'Who\'s Travelling',
  3: 'Travel Style',
  4: 'Getting There',
  5: 'Experiences',
  6: 'Practical Details',
  7: 'Contact Info',
};

export const WizardLayout = ({ children }) => {
  const { currentStep, totalSteps } = useForm();
  const currentImage = stepImages[currentStep] || stepImages[1];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-sand">
      {/* Left Panel - Image */}
      <div className="lg:w-[40%] h-[30vh] lg:h-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        {/* Logo overlay */}
        <div className="absolute top-6 left-6 z-10">
          <Logo size="default" className="text-white [&_span]:text-white [&_.text-stone-500]:text-white/80 [&_.text-terracotta]:text-dusty-rose" />
        </div>
        
        {/* Step indicator overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <p className="font-accent text-xl text-white/90 mb-2">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="font-heading text-3xl lg:text-4xl text-white font-semibold">
            {stepTitles[currentStep]}
          </h2>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="lg:w-[60%] flex flex-col min-h-[70vh] lg:min-h-screen">
        {/* Progress bar */}
        <div className="h-1 bg-stone-200">
          <motion.div 
            className="h-full bg-terracotta"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Form content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
