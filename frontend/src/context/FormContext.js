import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const initialFormData = {
  // Step 1: Trip Details
  destinations: '',
  destination_flexibility: 'open',
  departure_airport: '',
  departure_flexible: false,
  travel_start_date: '',
  travel_end_date: '',
  travel_date_notes: '',
  trip_length_nights: '',
  
  // Step 2: Group & Budget
  adult_count: 2,
  child_count: 0,
  child_ages: '',
  budget_min: '',
  budget_max: '',
  budget_flexibility: 'flexible',
  budget_scope: 'total_trip',
  
  // Step 3: Travel Style
  travel_pace: 'balanced',
  travel_interests: [],
  accommodation_type: [],
  accommodation_priority: 'flexible',
  
  // Step 4: Flights & Transport
  flight_priority: 'balanced',
  layover_tolerance: 'flexible',
  airline_preferences: '',
  transport_preference: [],
  
  // Step 5: Experiences
  must_do_experiences: '',
  exploration_style: 'mixed',
  special_occasion: '',
  
  // Step 6: Practical Details
  dietary_requirements: '',
  accessibility_needs: '',
  passport_valid: 'yes',
  
  // Step 7: Contact & Next Steps
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  preferred_contact_method: 'email',
  booking_timeline: 'exploring',
  planning_style: 'collaborative',
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      totalSteps,
      nextStep,
      prevStep,
      goToStep,
      resetForm,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
