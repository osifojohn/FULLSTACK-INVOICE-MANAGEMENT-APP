import { Request, Response } from 'express';
import User, { validateUser } from '../models/user';
import { IOrganisation, IUserRequestAdmin, STATUSCODE } from '../types';
import { validateOrganisation } from '../models/organisation';
import Organisation from '../models/organisation';

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
    res.status(STATUSCODE.BAD_REQUEST).json({
      message: 'Invalid organisation data received',
    });
  }
};

// @desc Create new admin
// @route POST /users
// @access public
export const adminSignup = async (
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

  const duplicateUserEmail = await User.findOne({ email });
  if (duplicateUserEmail) {
    return res
      .status(STATUSCODE.BAD_REQUEST)
      .json({ message: 'Email already taken' });
  }

  try {
    const retrivedOrganisation = await Organisation.findById(
      organisation
    ).exec();
    if (retrivedOrganisation) {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
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
    } else {
      res.status(STATUSCODE.BAD_REQUEST).json({
        message: 'Invalid personal details received',
      });
    }
  } catch (error) {
    res.status(STATUSCODE.BAD_REQUEST).json({
      message: 'Invalid personal details received',
    });
  }
};
