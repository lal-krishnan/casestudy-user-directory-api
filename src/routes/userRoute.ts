import express from 'express';
import UserController from '../controllers/userController';
import {
    createUserValidationRules,
    updateUserValidationRules,
    validateUser
} from '../helper/validations';
import validateObjectId from '../middlewares/validateId';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id',validateObjectId, UserController.getUserById);
userRouter.post('/', createUserValidationRules, validateUser, UserController.createUser);
userRouter.put('/:id',validateObjectId, updateUserValidationRules, validateUser, UserController.updateUser);
userRouter.delete('/:id',validateObjectId,  validateUser, UserController.deleteUser);

export default userRouter;