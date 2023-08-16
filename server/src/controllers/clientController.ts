import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { IClient, PaginationRequest, STATUSCODE } from '../types';
import Client, { validateClient } from '../models/client';

//@desc Get all clients
//@route GET /client/all-clients
//@access private
export const getAllClients = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 20 }: PaginationRequest = req.body;

    if (typeof page !== 'number' || typeof limit !== 'number') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid request');
    }

    const clients = await Client.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!clients || clients.length === 0) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No search result found');
    }

    const count = await Client.count();

    res.status(STATUSCODE.SUCCESS).json({
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

//@desc Search clients by name
//@route GET /client/search
//@access private
export const searchClients = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      keyword,
      page = 1,
      limit = 20,
    }: { keyword: string } & PaginationRequest = req.body;

    if (!keyword || typeof keyword !== 'string') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid keyword');
    }

    if (typeof page !== 'number' || typeof limit !== 'number') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid  request');
    }

    const clients = await Client.find({
      name: { $regex: keyword, $options: 'i' },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!clients || clients.length === 0) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No search result found');
    }

    const count = await Client.count();

    res.status(STATUSCODE.SUCCESS).json({
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

//@desc Get client
//@route GET /client/:id
//@access private
export const getSingleClient = asyncHandler(
  async (req: Request, res: Response) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Client not found');
    }
    res.status(200).json(client);
  }
);

// @desc add new Client
// @route POST /Client
// @access private
export const addClient = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    country,
    city,
    postalCode,
    telephone,
    address,
  }: IClient = req.body;

  const { error } = validateClient({
    name,
    email,
    country,
    city,
    postalCode,
    telephone,
    address,
  });

  if (error) {
    res.status(STATUSCODE.BAD_REQUEST);
    throw new Error(error.details[0].message);
  }
  const isNameTaken = await Client.findOne({ name });
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
    name,
    email,
    country,
    city,
    postalCode,
    telephone,
    address,
  });
  if (client) {
    res.status(STATUSCODE.CREATED).json({
      message: `${name} added to clients list`,
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
      name,
      email,
      country,
      city,
      postalCode,
      telephone,
      address,
    }: IClient = req.body;

    const { error } = validateClient({
      name,
      email,
      country,
      city,
      postalCode,
      telephone,
      address,
    });

    if (error) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error(error.details[0].message);
    }

    const client = await Client.findById(req.params.id);
    console.log(client);

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
