import pack from '../../package.json';

register.attributes = {
  name: 'public',
  version: pack.version
};

function register(server, options, next) {
  // Pictures endpoint
  server.route({
    method: 'GET',
    path: '/pictures/{path*}',
    handler: {
      directory: {
        path: './pictures'
      }
    }
  });

  next();
}

export default register;
