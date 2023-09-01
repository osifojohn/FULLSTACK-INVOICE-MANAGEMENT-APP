import { createContext } from 'react';

export const StepperContext = createContext<{
  userData: { [key: string]: string };
  setUserData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  companyData: { [key: string]: string };
  setCompanyData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  finalData: {
    [key: string]: string;
  }[];
  setFinalData: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: string;
      }[]
    >
  >;
}>({
  userData: {},
  setUserData: () => {},
  companyData: {},
  setCompanyData: () => {},
  finalData: [],
  setFinalData: () => [],
});
