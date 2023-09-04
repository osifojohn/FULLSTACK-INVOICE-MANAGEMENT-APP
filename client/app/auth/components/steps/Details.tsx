'use client';
import { useContext, useEffect } from 'react';

import { persoanlDetailsFields } from '../../../../constants/formFields';
import FormAction from '../../../../components/forms/formAction';
import { StepperContext } from '@/context/stepperContext';
import Input from '../../../../components/forms/input';
import { useRegisterUserMutation } from '@/redux/services/authApi';
import { toast } from 'react-hot-toast';

interface DetailsProps {
  toggleLogin(): void;
}

const fields = persoanlDetailsFields;
let fieldsState: { [key: string]: string } = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Details({ toggleLogin }: DetailsProps) {
  const { userData, setUserData } = useContext(StepperContext);
  const { companyData } = useContext(StepperContext);
  const { finalData, setFinalData } = useContext(StepperContext);

  const [registerUser, { data, isLoading, isError, error }] =
    useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserData({ ...userData, [e.target.id]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    createAccount();
  };

  const createAccount = async () => {
    await registerUser(finalData);
  };

  useEffect(() => {
    if (isError || error) {
      const err = error as any;
      toast.error(err.data.message);
      return;
    }
    if (userData || companyData) {
      setFinalData({
        organisation: { ...companyData },
        userAdmin: { ...userData },
      });
    }
    if (data) {
      toast.success(data?.message);
      toggleLogin();
    }
  }, [
    userData,
    companyData,
    isError,
    error,
    setFinalData,
    isLoading,
    data,
    toggleLogin,
  ]);

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

      <FormAction
        handleSubmit={handleSubmit}
        text="Signup"
        isLoading={isLoading}
      />
    </form>
  );
}
