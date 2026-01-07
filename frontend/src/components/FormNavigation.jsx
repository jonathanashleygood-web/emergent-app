import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useForm } from '../context/FormContext';
import { Button } from './ui/button';

export const FormNavigation = ({ onSubmit, isSubmitting = false }) => {
  const { currentStep, totalSteps, nextStep, prevStep } = useForm();
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-stone-200">
      {!isFirstStep ? (
        <Button
          type="button"
          variant="ghost"
          onClick={prevStep}
          className="flex items-center gap-2 text-stone-600 hover:text-charcoal"
          data-testid="btn-prev-step"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      ) : (
        <div />
      )}
      
      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-8 py-3 font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          data-testid="btn-submit-inquiry"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              Submit Inquiry
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={nextStep}
          className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-8 py-3 font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          data-testid="btn-next-step"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
