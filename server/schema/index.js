import apolloServer from 'apollo-server';
import pack from '../../package.json';
import schema from './schema';

register.attributes = {
  name: 'schema',
  version: pack.version
};

function register(server, options, next) {
  options = { apolloOptions: {}, ...options };
  options.apolloOptions = { schema, ...options.apolloOptions };

  apolloServer.apolloHapi(server, options, next);
}

export default register;
