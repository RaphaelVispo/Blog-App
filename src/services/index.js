import { createBlog } from './blog/create-blog.js';
import { deleteBlog } from './blog/delete-blog.js';
import { getBlog } from './blog/get-blog.js';
import { updateBlog } from './blog/update-blog.js';
import { addComment } from './comments/add-comment.js';
import { updateComment } from './comments/edit-comments.js';
import { general } from './general/index.js';
import { login } from './users/login.js';
import { logout } from './users/logout.js';
import { registerUser } from './users/register-user.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

    general=general
    registerUser=registerUser
    login=login
    logout=logout

    createBlog=createBlog
    updateBlog=updateBlog
    getBlog=getBlog
    deleteBlog=deleteBlog

    addComment=addComment
    updateComment=updateComment
}
