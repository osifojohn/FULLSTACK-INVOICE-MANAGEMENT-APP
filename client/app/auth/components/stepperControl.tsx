'use client';
import React from 'react';

interface StepperControlProps {
  handleClick: (val: string) => void;
  currentStep: number;
  steps: string[];
}

const StepperControl = ({
  handleClick,
  currentStep,
  steps,
}: StepperControlProps) => {
  return (
    <div
      onClick={() => handleClick('back')}
      className="container flex justify-around mt-4 mb-8"
    >
      <button
        type="submit"
        className={`bg-white  text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white duration-200 ease-in-out ${
          currentStep === 1 && currentStep !== steps.length - 1
            ? 'opacity-50 cursor-not-allowed'
            : 'opacity-100 bg-[#3b82f6]'
        }`}
      >
        Back
      </button>
      <>
        {currentStep === steps.length - 1 ? (
          <button
            type="submit"
            onClick={() => handleClick('next')}
            className="bg-[#3b82f6] text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white duration-200 ease-in-out"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-[#3b82f6] cursor-not-allowed text-white uppercase py-2 px-4 rounded-xl font-semibold   hover:bg-slate-700 hover:text-white duration-200 ease-in-out"
          >
            Next
          </button>
        )}
      </>
    </div>
  );
};

export default StepperControl;
