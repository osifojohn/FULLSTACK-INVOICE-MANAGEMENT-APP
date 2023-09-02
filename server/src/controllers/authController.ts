import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ILogin, IOrganisation, IUserRequestAdmin, STATUSCODE } from '../types';
import { validateOrganisation } from '../models/organisation';
import { Organisation } from '../models/organisation';
import { validateUser, User } from '../models/user';

interface RequestBodySignUp {
  organisation: IOrganisation;
  adminUser: IUserRequestAdmin;
}

// @desc Create new organisation with admin
// @route POST /admin
// @access public
export const adminSignup = asyncHandler(async (req: Request, res: Response) => {
  const {
    organisation: { name, logoUrl, orgPhone, orgEmail, address, country, city },
    adminUser: { firstName, lastName, email, password, phone },
  }: RequestBodySignUp = req.body;

  const { error: errOrg } = validateOrganisation({
    name,
    logoUrl,
    orgPhone,
    orgEmail,
    city,
    address,
    country,
  });

  if (errOrg) {
    const [errorMessage] = errOrg.details.map((detail) => detail.message);
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error(errorMessage);
  }

  const { error: errUser } = validateUser({
    firstName,
    lastName,
    email,
    password,
    phone,
  });

  if (errUser) {
    const [errorMessage] = errUser.details.map((detail) => detail.message);
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error(errorMessage);
  }

  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Email already taken');
  }

  const org = await Organisation.create({
    name,
    logoUrl,
    phone: orgPhone,
    email: orgEmail,
    address,
    country,
    city,
  });

  const hashedPwd = await bcrypt.hash(password, 10);

  await User.create({
    firstName,
    lastName,
    email,
    password: hashedPwd,
    phone,
    organisation: org?._id.toString(),
    role: 'admin',
    active: true,
  });

  res.status(STATUSCODE.CREATED).json({
    message: `New Oganiation with admin '${firstName}' created`,
  });
});

// @desc Login user
// @route POST /login
// @access public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: ILogin = req.body;

  let org;
  let orgName;
  let orgId;

  if (!email || !password) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Please enter all field values');
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.active) {
    res.status(STATUSCODE.UNAUTHORIZED);
    throw new Error('Unauthorized');
  }

  if (foundUser) {
    const { organisation } = foundUser;
    org = await Organisation.findOne({ _id: organisation.toString() }).exec();
    orgName = org?.name;
    orgId = org?._id;
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    res.status(STATUSCODE.UNAUTHORIZED);
    throw new Error('Unauthorized');
  }

  if (foundUser && org) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: foundUser.firstName,
          email: foundUser.email,
          userId: foundUser?._id.toString(),
          role: foundUser.role,
          orgId: org?._id.toString(),
        },
      },

      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '24hr' }
    );

    const { firstName, _id: user_id } = foundUser;
    const userId = user_id.toString();

    res.status(200).json({ firstName, userId, orgName, orgId, accessToken });
  }
});
