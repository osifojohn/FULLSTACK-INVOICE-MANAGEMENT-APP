'use client';
import React, { useState } from 'react';

import StepperControl from './components/stepperControl';
import Company from './components/steps/company';
import Details from './components/steps/Details';
import Stepper from './components/stepper';
import Logo from '@/components/Logo';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ['Company Information', 'Personal Details'];

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <Company />;
      case 2:
        return <Details />;
      default:
    }
  };

  const handleClick = (direction: string) => {
    let newStep = currentStep;
    direction === 'next' ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="md:w-1/2 mx-auto  mt-10 rounded-[2px] pb-2 bg-white shadow-shadow-2  border-t-[5px] border-t-primary-800">
      <div className="flex justify-center  max-h-12">
        {' '}
        <Logo width={150} height={150} />
      </div>
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />

        <div>{displayStep(currentStep)}</div>
      </div>

      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
};

export default Onboarding;
