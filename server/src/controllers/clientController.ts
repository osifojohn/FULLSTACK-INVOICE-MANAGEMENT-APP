import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { IClient, STATUSCODE } from '../types';
import Client, { validateClient } from '../models/client';

//@desc Get all clients
//@route GET /client/all-clients
//@access private
export const getClients = asyncHandler(async (req: Request, res: Response) => {
  const contacts = await Client.find();
  res.status(200).json(contacts);
});

//@desc Get client
//@route GET /client/:id
//@access private
export const getClient = asyncHandler(async (req: Request, res: Response) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Client not found');
  }
  res.status(200).json(client);
});

// @desc add new Client
// @route POST /Client
// @access private
export const addClient = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    companyName,
    email,
    country,
    city,
    postalCode,
    telephone,
    address,
  }: IClient = req.body;

  const { error } = validateClient({
    companyName,
    email,
    country,
    city,
    postalCode,
    telephone,
    address,
  });

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const isNameTaken = await Client.findOne({ companyName });
  if (isNameTaken) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Existing Client');
  }
  const isEmailTaken = await Client.findOne({ email });
  if (isEmailTaken) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Existing Client');
  }
  const isPhoneNumberTaken = await Client.findOne({ telephone });
  if (isPhoneNumberTaken) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error('Existing Client');
  }

  const client = await Client.create({
    companyName,
    email,
    country,
    city,
    postalCode,
    telephone,
    address,
  });
  if (client) {
    res.status(STATUSCODE.CREATED).json({
      message: `${companyName} added to clients list`,
      id: client?._id.toString(),
    });
  }
});

//@desc Update contact
//@route PUT /client/:id
//@access private
export const updateClient = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      companyName,
      email,
      country,
      city,
      postalCode,
      telephone,
      address,
    }: IClient = req.body;

    const { error } = validateClient({
      companyName,
      email,
      country,
      city,
      postalCode,
      telephone,
      address,
    });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const client = await Client.findById(req.params.id);

    if (!client) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Client not found');
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(STATUSCODE.CREATED).json(updatedClient);
  }
);
