'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useLoginUserMutation } from '@/redux/services/authApi';
import FormAction from '../../../components/forms/formAction';
import { addUserToLocalStorage } from '@/utils/localStorage';
import { loginFields } from '../../../constants/formFields';
import { setUser } from '@/redux/features/auth.slice';
import Input from '../../../components/forms/input';
import { useAppDispatch } from '@/redux/hooks';

const fields = loginFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const dispatch = useAppDispatch();
  const [loginUser, { data, isSuccess, isLoading, isError, error, status }] =
    useLoginUserMutation();

  const err = error as any;

  const [loginState, setLoginState] = useState<{ [key: string]: string }>(
    fieldsState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    await loginUser(loginState);
    if (isLoading) return;
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
    }
  }, [isError, isSuccess, err, data, dispatch]);

  return (
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
  );
}
