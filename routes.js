const routes = require('next-routes')();

routes
  .add('/marriage/new', '/marriage/new')
  .add('/marriage/:marriage', '/marriage/show')
  .add('/sendmessage', '/marriage/sendmessage')
  .add('/sendmessage/:marriage', '/marriage/sendmessage')
  .add('/marriage/:marriage/requests', '/marriage/requests/index')
  .add('/marriage/:marriage/requests/new', '/marriage/requests/new');

module.exports = routes;
