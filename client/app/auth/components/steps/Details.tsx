'use client';
import { useContext, useEffect } from 'react';

import { persoanlDetailsFields } from '../../../../constants/formFields';
import FormAction from '../../../../components/forms/formAction';
import { StepperContext } from '@/context/stepperContext';
import Input from '../../../../components/forms/input';

const fields = persoanlDetailsFields;
let fieldsState: { [key: string]: string } = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Details() {
  const { userData, setUserData } = useContext(StepperContext);
  const { companyData } = useContext(StepperContext);
  const { finalData, setFinalData } = useContext(StepperContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserData({ ...userData, [e.target.id]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(finalData);
    createAccount();
  };

  useEffect(() => {
    setFinalData([{ ...userData }, { ...companyData }]);
  }, [userData, companyData, setFinalData]);

  const createAccount = () => {};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={userData[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormAction handleSubmit={handleSubmit} text="Signup" />
    </form>
  );
}
