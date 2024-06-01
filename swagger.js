const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Resume API',
    description: '輸入你的個人資料，我們會幫您儲存，日後產生履歷文件時，就可以直接使用囉！',
  },
  host: 'jumimi-chatbot-app-12e234121890.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);