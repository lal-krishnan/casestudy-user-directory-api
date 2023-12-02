import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { User } from '../types/User';
class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const existingUser = await UserModel.findById(userId);
      if (existingUser) {
        res.status(200).json(existingUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const newUser = new UserModel(userData);
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
   
    try {
      const existingUser = await UserModel.findById(userId);
      const updatedUserData: User = req.body;
      if (existingUser) {
        existingUser.set({...existingUser,...updatedUserData});
        await existingUser.save();
        res.json({ message: 'User updated successfully', user: existingUser });
      } else {
        res.status(404).json({ message: 'Error updating user' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  static async deleteUser(req: Request, res: Response) {    
    try {
      const userId = req.params.id;
      const existingUser = await UserModel.findByIdAndDelete(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  }
}

export default UserController;