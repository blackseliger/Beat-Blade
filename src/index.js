import Router from './router/index.js';

console.log('gdhkjghdkh')
const router = Router.instance();

router
  .addRoute(/^$/, 'game')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('game')
  .listen();
