import { createContext } from 'react';

export const StepperContext = createContext<{
  userData: { [key: string]: string };
  setUserData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  companyData: { [key: string]: string };
  setCompanyData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  finalData: {
    organisation: {
      [key: string]: string;
    };
    userAdmin: {
      [key: string]: string;
    };
  };
  setFinalData: React.Dispatch<
    React.SetStateAction<{
      organisation: {
        [key: string]: string;
      };
      userAdmin: {
        [key: string]: string;
      };
    }>
  >;
}>({
  userData: {},
  setUserData: () => {},
  companyData: {},
  setCompanyData: () => {},
  finalData: { organisation: {}, userAdmin: {} },
  setFinalData: () => {},
});
