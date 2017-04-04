import pack from '../../package.json';

register.attributes = {
  name: 'api',
  version: pack.version
};

function register(server, options, next) {
  const path = options.path || '/api';

  server.route({
    method: 'GET',
    path: `${path}/hello-world`,
    handler(request, reply) {
      reply({
        result: 'hello world'
      });
    }
  });

  next();
}

export default register;
