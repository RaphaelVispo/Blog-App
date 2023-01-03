import { html } from 'lit';
import { redirectIfLoggedIn } from './utils/helpers/redirect-if-logged-in.js';
import { redirectIfLoggedOut } from './utils/helpers/redirect-if-logged-out.js';

const router = document.querySelector('small-router');

export const routes = {
  '/': {
    /**
     * render function below is the same as
     * function () {
     *  return html`
     *    <page-home></page-home>
     *  `;
     * }
     *
     * This creates an html string to be rendered on the page
     */
    render: () => html`
      <page-home></page-home>
    `,
    // lazy-loads the page when the URL pattern is visited
    preRender: () => import('./pages/user-pages/page-home/index.js')
  },
  '/login': {
    render: () => html`
      <page-login></page-login>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedIn,
      () => import('./pages/user-pages/page-login/index.js')
    ]
  },
  '/register': {
    render: () => html`
      <page-register></page-register>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedIn,
      () => import('./pages/user-pages/page-register/index.js')
    ]
  },
  '/change-password': {
    render: () => html`
      <page-change-password></page-change-password>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedIn,
      () => import('./pages/user-pages/page-change-password/index.js')
    ]
  },
  '/change-user-data': {
    render: () => html`
      <page-change-user-data></page-change-user-data>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedIn,
      () => import('./pages/user-pages/page-change-user-data/index.js')
    ]
  },
  '/user': {
    render: () => html`
      <page-users></page-users>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/user-pages/page-user/index.js')
    ]
  },

  '/blog': {
    render: () => html`
      <page-blogs></page-blogs>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/blog-pages/page-list/index.js')
    ]
  },
  '/blog/:id': {
    render: () => html`
      <page-blog-one .paramObject=${router.paramObject}></page-blog-one>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/blog-pages/page-one-blog/index.js')
    ]
  },

  '/logout': {
    render: () => html`
      <page-logout></page-logout>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/user-pages/page-logout/index.js')
    ]
  }
};
