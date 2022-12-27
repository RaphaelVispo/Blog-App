import { general } from './general/index.js';
import { login } from './users/login.js';
import { registerUser } from './users/register-user.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

    general=general
    registerUser=registerUser
    login=login
}
