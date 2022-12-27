import { general } from './general/index.js';
import { registerUser } from './users/register-user.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

    general=general
    registerUser=registerUser
}
