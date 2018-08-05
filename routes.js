const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:marriage', '/campaigns/show')
  .add('/campaigns/:marriage/requests', '/campaigns/requests/index')
  .add('/campaigns/:marriage/requests/new', '/campaigns/requests/new');


module.exports = routes;
