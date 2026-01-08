import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { FormProvider, useForm } from '../context/FormContext';
import WizardLayout from '../components/WizardLayout';
import Step1TripDetails from './steps/Step1TripDetails';
import Step2GroupBudget from './steps/Step2GroupBudget';
import Step3TravelStyle from './steps/Step3TravelStyle';
import Step4Flights from './steps/Step4Flights';
import Step5Experiences from './steps/Step5Experiences';
import Step6Practical from './steps/Step6Practical';
import Step7Contact from './steps/Step7Contact';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InquiryFormContent = () => {
  const { currentStep, formData } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);



  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error('Please fill in your name and email');
      return;
    }

    if (!formData.destinations) {
      toast.error('Please tell us where you\'d like to go');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        adult_count: parseInt(formData.adult_count) || 1,
        child_count: parseInt(formData.child_count) || 0,
        trip_length_nights: formData.trip_length_nights ? parseInt(formData.trip_length_nights) : null,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
      };

      await axios.post(`${API}/inquiries`, submitData);
      toast.success('Your inquiry has been submitted!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1TripDetails />;
      case 2:
        return <Step2GroupBudget />;
      case 3:
        return <Step3TravelStyle />;
      case 4:
        return <Step4Flights />;
      case 5:
        return <Step5Experiences />;
      case 6:
        return <Step6Practical />;
      case 7:
        return <Step7Contact onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
      default:
        return <Step1TripDetails />;
    }
  };

  return (
    <WizardLayout>
      {renderStep()}
    </WizardLayout>
  );
};

export const InquiryForm = () => {
  return (
    <FormProvider>
      <InquiryFormContent />
    </FormProvider>
  );
};

export default InquiryForm;
