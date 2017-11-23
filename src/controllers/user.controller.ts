import { Router, Request, Response, NextFunction } from 'express';
import { default as User, UserModel, AuthToken } from '../models/user.model';
import { WriteError } from 'mongodb';

const request = require('express-validator');

export class UserController {

    router: Router;

    constructor() {
		this.router = Router();
		this.init();
    }
    
    init() {

		this.router.get('/:username/:password', this.login);
    }

    private users(req: Request, res: Response, next: NextFunction) {

    }
    
    public login(req: Request, res: Response, next: NextFunction) {

        const username = parseInt(req.params.username);
        const password = parseInt(req.params.password);
        const theUser = this.users.find((user) => user.username === username && user.password === password);
        
		if (theUser) {
			res.status(200).send({
				message: 'Success',
				status: res.status,
				theUser
			});
		} else {
			res.status(404).send({
				message: 'Failed to authenticate user {*error}.',
				status: res.status
			});
		}
    }
}

const userController = new UserController();
userController.init();

export default UserController.router;