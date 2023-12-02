import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'User not found' });
  }
  next(); 
};

export default validateObjectId;