'use client';
import { useEffect, useContext } from 'react';

import { companyDetailsFields } from '../../../../constants/formFields';
import { StepperContext } from '@/context/stepperContext';
import Input from '../../../../components/forms/input';

const fields = companyDetailsFields;
let fieldsState: { [key: string]: string } = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Company() {
  const { userData } = useContext(StepperContext);
  const { companyData, setCompanyData } = useContext(StepperContext);
  const { finalData, setFinalData } = useContext(StepperContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setFinalData({
      organisation: { ...companyData },
      userAdmin: { ...userData },
    });
  }, [userData, companyData, setFinalData]);

  return (
    <form className="mt-8 space-y-6">
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={companyData[field.id]}
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
    </form>
  );
}
