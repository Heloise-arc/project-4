import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import formIntern from '../../assets/images/form-intern.png';

interface ProgressStepsProps {
  currentStep: 'social' | 'trade' | 'confirmation';
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 'social', label: 'Connect Social' },
    { id: 'trade', label: 'Trade Details' },
    { id: 'confirmation', label: 'Confirmation' }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex || (stepId === 'confirmation' && currentStep === 'confirmation')) {
      return 'completed';
    }
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative">
              <div className="relative">
                <motion.div
                  initial={false}
                  animate={{
                    scale: getStepStatus(step.id) === 'current' ? 1.1 : 1,
                    backgroundColor: 
                      getStepStatus(step.id) === 'completed' ? '#4E9F3D' :
                      getStepStatus(step.id) === 'current' ? '#191A19' :
                      '#191A19'
                  }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-colors duration-200 relative
                    ${getStepStatus(step.id) === 'completed' ? 'border-[#4E9F3D]' :
                      getStepStatus(step.id) === 'current' ? 'border-[#4E9F3D]' :
                      'border-[#4E9F3D]/20'}
                  `}
                >
                  <AnimatePresence mode='wait'>
                    {getStepStatus(step.id) === 'completed' ? (
                      <motion.div
                        key="check"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-[#191A19]" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`font-mono ${
                          getStepStatus(step.id) === 'current' ? 'text-[#4E9F3D]' : 'text-[#4E9F3D]/40'
                        }`}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Form image that slides up and out */}
                <AnimatePresence>
                  {getStepStatus(step.id) === 'completed' && (
                    <motion.div
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: -40, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                      className="absolute left-0 right-0 mx-auto top-0 z-20 flex justify-center"
                    >
                      <img 
                        src={formIntern}
                        alt="Form"
                        className="w-16 h-16 object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <span className={`
                mt-2 font-mono text-sm
                ${getStepStatus(step.id) === 'completed' ? 'text-[#4E9F3D]' :
                  getStepStatus(step.id) === 'current' ? 'text-[#4E9F3D]' :
                  'text-[#4E9F3D]/40'}
              `}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center">
                <div className={`
                  h-0.5 w-full
                  ${getStepStatus(steps[index + 1].id) === 'completed' ? 'bg-[#4E9F3D]' : 'bg-[#4E9F3D]/20'}
                `} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 