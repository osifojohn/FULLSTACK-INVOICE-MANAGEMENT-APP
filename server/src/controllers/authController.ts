import { Request, Response } from 'express';
import User, { validateUser } from '../models/user';
import { ILogin, IOrganisation, IUserRequestAdmin, STATUSCODE } from '../types';
import { validateOrganisation } from '../models/organisation';
import Organisation from '../models/organisation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc Create new organisation
// @route POST /organisation
// @access public
export const organisationRegister = async (
  req: Request<unknown, unknown, IOrganisation>,
  res: Response
) => {
  const { name, imgUrl, phone, email, address, country } = req.body;
  const { error } = validateOrganisation({
    name,
    imgUrl,
    phone,
    email,
    address,
    country,
  });
  if (error) {
    return res
      .status(STATUSCODE.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  try {
    const isNameTaken = await Organisation.findOne({ name });
    if (isNameTaken) {
      return res
        .status(STATUSCODE.BAD_REQUEST)
        .json({ message: 'Name already taken' });
    }

    const org = await Organisation.create({
      name,
      imgUrl,
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
    } else {
      res.status(STATUSCODE.BAD_REQUEST).json({
        message: 'Invalid organisation data received',
      });
    }
  } catch (error) {
    res.status(STATUSCODE.SERVER_ERROR).json({
      message: 'Internal or server error',
    });
  }
};

// @desc Create new admin
// @route POST /users
// @access public
export const signup = async (
  req: Request<unknown, unknown, IUserRequestAdmin>,
  res: Response
) => {
  const { firstName, lastName, email, password, phone, organisation } =
    req.body;

  const { error } = validateUser({
    firstName,
    lastName,
    email,
    password,
    phone,
    organisation,
  });

  if (error) {
    return res
      .status(STATUSCODE.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) {
    res.status(STATUSCODE.BAD_REQUEST);
    return res
      .status(STATUSCODE.BAD_REQUEST)
      .json({ message: 'Email already taken' });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  try {
    const retrivedOrganisation = await Organisation.findById(
      organisation
    ).exec();

    if (!retrivedOrganisation) {
      return res
        .status(STATUSCODE.BAD_REQUEST)
        .json({ message: 'Invalid  details received' });
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
      user
        ? res.status(STATUSCODE.CREATED).json({
            message: `New admin ${firstName} created`,
          })
        : res.status(STATUSCODE.BAD_REQUEST).json({
            message: 'Invalid personal details received',
          });
    }
  } catch (error) {
    res.status(STATUSCODE.SERVER_ERROR).json({
      message: 'Internal or server error',
    });
  }
};

// @desc Login user
// @route POST /login
// @access public
export const login = async (
  req: Request<unknown, unknown, ILogin>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(STATUSCODE.BAD_REQUEST)
      .json({ message: 'Please enter all field values' });
  }

  try {
    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser || !foundUser.active) {
      return res
        .status(STATUSCODE.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match)
      return res
        .status(STATUSCODE.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });

    if (foundUser && match) {
      const accessToken = jwt.sign(
        {
          user: {
            firstName: foundUser.firstName,
            email: foundUser.email,
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' }
      );
      res.status(200).json({ accessToken });
    } else {
      res
        .status(STATUSCODE.UNAUTHORIZED)
        .json('email or password is not valid');
    }
  } catch (error) {
    res.status(STATUSCODE.SERVER_ERROR).json('Internal or server error');
  }
};
