'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { persoanlDetailsFields } from '../../../../constants/formFields';
import FormAction from '../../../../components/forms/formAction';
import { addUserToLocalStorage } from '@/utils/localStorage';
import { StepperContext } from '@/context/stepperContext';
import { setUser } from '@/redux/features/auth.slice';
import Input from '../../../../components/forms/input';
import { useAppDispatch } from '@/redux/hooks';
import { routes } from '@/constants/links';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '@/redux/services/authApi';

interface DetailsProps {
  toggleLogin(): void;
}

const fields = persoanlDetailsFields;
let fieldsState: { [key: string]: string } = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Details({ toggleLogin }: DetailsProps) {
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const { userData, setUserData } = useContext(StepperContext);
  const { companyData } = useContext(StepperContext);
  const { finalData, setFinalData } = useContext(StepperContext);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [registerUser, { data, isLoading, isError, error }] =
    useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      isLoading: loginIsLoading,
      isError: loginIsError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserData({ ...userData, [e.target.id]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    createAccount();
  };

  const handleSubmitDemo = async () => {
    setIsLogin(true);
    await loginUser({ email: 'osifojohntec@gmail.com', password: '1234567' });
  };

  const createAccount = async () => {
    await registerUser(finalData);
  };

  useEffect(() => {
    if (isLoading || loginIsLoading) {
      setToastDisplayed(false);
    }

    if (isError || error) {
      if (!toastDisplayed) {
        const err = error as any;
        toast.error(err.data.message);
        setToastDisplayed(true);
      }
      return;
    }

    if (loginIsError || loginError) {
      if (!toastDisplayed) {
        const err = loginError as any;
        toast.error(err.data.message);
        setToastDisplayed(true);
      }
      return;
    }

    if (userData || companyData) {
      setFinalData({
        organisation: { ...companyData },
        userAdmin: { ...userData },
      });
    }
    if (data) {
      if (!toastDisplayed) {
        toast.success(data?.message);
        toggleLogin();
        setToastDisplayed(true);
      }
    }

    if (loginData) {
      if (!toastDisplayed) {
        toast.success('Login Successful');
        addUserToLocalStorage(loginData);
        dispatch(setUser(loginData));

        //push user to dashboard
        router.push(`${routes.DASHBOARD}/home`);
      }
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
    toastDisplayed,
    loginData,
    dispatch,
    router,
    loginError,
    loginIsError,
    loginIsLoading,
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

      {/* <FormAction
        handleSubmit={handleSubmitDemo}
        text="Demo"
        isLoading={isLoading}
        isDemo={true}
      /> */}
    </form>
  );
}
