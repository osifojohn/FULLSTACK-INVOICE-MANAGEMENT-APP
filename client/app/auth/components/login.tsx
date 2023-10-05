'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useLoginUserMutation } from '@/redux/services/authApi';
import FormAction from '../../../components/forms/formAction';
import { addUserToLocalStorage } from '@/utils/localStorage';
import { loginFields } from '../../../constants/formFields';
import { setUser } from '@/redux/features/auth.slice';
import Input from '../../../components/forms/input';
import { useAppDispatch } from '@/redux/hooks';
import { routes } from '@/constants/links';

const fields = loginFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { data, isSuccess, isLoading, isError, error }] =
    useLoginUserMutation();

  const err = error as any;

  const [loginState, setLoginState] = useState<{ [key: string]: string }>(
    fieldsState
  );

  const handleSubmitDemo = async () => {
    await loginUser({
      email: 'osifojohntec@gmail.com',
      password: '1234567',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    if (isLoading) return;
    await loginUser(loginState);
  };

  useEffect(() => {
    if (isError && err) {
      toast.error(err.data.message);
    }

    if (isSuccess && data) {
      toast.success('Login Successful');
      addUserToLocalStorage(data);
      dispatch(setUser(data));

      //push user to dashboard
      router.push(`${routes.DASHBOARD}/home`);
    }
  }, [isError, isSuccess, err, data, router, dispatch]);

  return (
    <>
      <form className="mt-8 space-y-6 mb-5" onSubmit={handleSubmit}>
        <div className="-space-y-px pb-6">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
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
          text="Login"
          isLoading={isLoading}
        />
      </form>

      <button
        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-red-500   
        focus:outline-none focus:ring-2 focus:ring-offset-2  mt-10`}
        disabled={isLoading}
        onClick={handleSubmitDemo}
      >
        {isLoading ? 'Loading' : 'Demo'}
      </button>
    </>
  );
}
