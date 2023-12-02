import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
export const createUserValidationRules = [
  body('email').isEmail().withMessage('Invalid email address format'),
  body('email').custom(async (value) => {
    const existingUser = await UserModel.findOne({ email: value });
    if (existingUser) {
      throw new Error('Email address already exists');
    }
    return true;
  }),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];
export const updateUserValidationRules = [
  body('email').optional().isEmail().withMessage('Invalid email address format'),
  param('id').notEmpty()
];

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};