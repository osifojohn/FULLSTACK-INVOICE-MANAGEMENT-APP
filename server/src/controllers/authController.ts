import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User, { validateUser } from '../models/user';
import { ILogin, IOrganisation, IUserRequestAdmin, STATUSCODE } from '../types';
import { validateOrganisation } from '../models/organisation';
import Organisation from '../models/organisation';

// @desc Create new organisation
// @route POST /organisation
// @access public
export const organisationRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, logoUrl, phone, email, address, country }: IOrganisation =
      req.body;

    const { error } = validateOrganisation({
      name,
      logoUrl,
      phone,
      email,
      address,
      country,
    });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const isNameTaken = await Organisation.findOne({ name });
    if (isNameTaken) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Name already taken');
    }

    const org = await Organisation.create({
      name,
      logoUrl,
      phone,
      email,
      address,
      country,
    });
    if (org) {
      res.status(STATUSCODE.CREATED).json({
        message: `New company ${name} created`,
        id: org?._id.toString(),
      });
    }
  }
);

// @desc Create new admin
// @route POST /admin
// @access public
export const adminSignup = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    organisation,
  }: IUserRequestAdmin = req.body;

  const { error } = validateUser({
    firstName,
    lastName,
    email,
    password,
    phone,
    organisation,
  });

  if (error) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error(error.details[0].message);
  }

  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Email already taken');
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const retrivedOrganisation = await Organisation.findById(organisation).exec();

  if (!retrivedOrganisation) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Invalid  details received');
  }

  if (retrivedOrganisation) {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      phone,
      organisation,
      role: 'admin',
      active: true,
    });
    if (user) {
      res.status(STATUSCODE.CREATED).json({
        message: `New admin ${firstName} created`,
      });
    }
  }
});

// @desc Login user
// @route POST /login
// @access public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: ILogin = req.body;

  if (!email || !password) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Please enter all field values');
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.active) {
    res.status(STATUSCODE.UNAUTHORIZED);
    throw new Error('Unauthorized');
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    res.status(STATUSCODE.UNAUTHORIZED);
    throw new Error('Unauthorized');
  }

  if (foundUser && match) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: foundUser.firstName,
          email: foundUser.email,
          userId: foundUser.id,
          role: foundUser.role,
          orgId: foundUser.organisation,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '24hr' }
    );
    res.status(200).json({ accessToken });
  }
});
