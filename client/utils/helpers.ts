import { User } from '@/types';

export const validateUser = (user: User) => {
  const { accessToken, firstName, orgName, userId, orgId } = user || {};
  if (!accessToken || !firstName || !orgName || !userId || !orgId) return false;

  return true;
};
