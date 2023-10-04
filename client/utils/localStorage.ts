import { User } from '@/types';

export const addUserToLocalStorage = (user: User) => {
  localStorage.setItem('INVOICESTER_USER', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('INVOICESTER_USER');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('INVOICESTER_USER');
  console.log(result);
  const user = result ? JSON.parse(result) : null;
  return user;
};
