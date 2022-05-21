import Router from './router/index.js';

console.log('gdhkjghdkh')
const router = Router.instance();

router
  .addRoute(/^Beat-Blade\/?$/, 'game')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('error404')
  .listen();
