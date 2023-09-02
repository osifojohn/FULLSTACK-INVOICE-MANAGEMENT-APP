'use client';
import React, { useState } from 'react';

import { StepperContext } from '../../context/stepperContext';
import StepperControl from './components/stepperControl';
import Details from './components/steps/Details';
import Company from './components/steps/company';
import Header from '@/components/forms/Header';
import Stepper from './components/stepper';
import Login from './components/login';

const Onboarding = () => {
  const [companyData, setCompanyData] = useState<{ [key: string]: string }>({});
  const [userData, setUserData] = useState<{ [key: string]: string }>({});
  const [finalData, setFinalData] = useState<{ [key: string]: string }[]>([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  function toggle() {
    setIsLogin(!isLogin);
    setIsRegister(!isRegister);
  }

  const steps = ['Company', 'Personal'];

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="px-10">
            <Company />
          </div>
        );
      case 2:
        return (
          <div className="px-10 pb-8">
            <Details />
          </div>
        );
      default:
    }
  };

  const handleClick = (direction: string) => {
    let newStep = currentStep;
    direction === 'next' ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  if (isRegister) {
    return (
      <div className="tabPort:w-[85vw]  sm:w-[37%]  mx-auto  mt-7 rounded-[2px] pb-2 bg-white shadow-shadow-2  border-t-[5px] border-t-[#3b82f6]">
        <div className="flex justify-center mt-4 ">
          {' '}
          <Header
            heading="Create an account"
            paragraph="Already have an account? "
            linkName="Login"
            toggle={toggle}
          />
        </div>
        <div className="container horizontal">
          <Stepper steps={steps} currentStep={currentStep} />

          <div>
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
                companyData,
                setCompanyData,
                finalData,
                setFinalData,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
    );
  }

  return (
    <>
      <div className="tabPort:w-[85vw]  sm:w-[37%]  mx-auto  pt-5    mt-10 rounded-[2px] bg-white shadow-shadow-2  border-t-[5px] border-t-[#3b82f6]">
        <div className="flex justify-center mt-8 ">
          {' '}
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Register"
            toggle={toggle}
          />
        </div>

        <div className="px-10 pb-9">
          <Login />
        </div>
      </div>
    </>
  );
};

export default Onboarding;
