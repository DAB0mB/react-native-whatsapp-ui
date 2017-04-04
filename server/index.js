import apolloServer from 'apollo-server';
import chalk from 'chalk'
import hapi from 'hapi';
import inert from 'inert';
import moment from 'moment';
import mongoose from 'mongoose';
import prettyjson from 'prettyjson';
import apiPlugin from './api';
import publicPlugin from './public';
import schemaPlugin from './schema';

const appUrl = process.env.APP_URL = String(process.env.APP_URL || '*')
const host = process.env.HOST = String(process.env.HOST || 'localhost');
const port = process.env.PORT = Number(process.env.PORT || 8000);
const dbPort = process.env.DB_PORT = Number(process.env.DB_PORT || 27017);
const dbEnabled = process.env.DB_ENABLED = !!JSON.parse(process.env.DB_ENABLED || 1);
const nodeEnv = process.env.NODE_ENV = String(process.env.NODE_ENV || 'development');

// Initialize a new server
const server = new hapi.Server({
  connections: {
    routes: {
      files: {
        // Served files will be relatively to this directory
        relativeTo: `${__dirname}/public`
      }
    }
  }
});

server.connection({ host, port });

// Report each response made
server.ext('onPreResponse', (request, reply) => {
  const res = request.response;

  const report = prettyjson.render({
    time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    target: request.info.remoteAddress,
    method: request.method,
    url: request.url.path,
    status: res.statusCode || res.output.statusCode
  });

  console.log();
  console.log('Outcoming response:');
  console.log();
  console.log(report.replace(/\n/g, '\n  '));
  console.log();

  reply.continue();
});

// Allow access only to our application
server.ext('onPreResponse', ({ response }, reply) => {
  if (!(response instanceof Error)) {
    response.header('Access-Control-Allow-Origin', process.env.APP_URL);
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  }

  reply.continue();
});

const registrations = [];

/* Base plug-ins which will be loaded on both development and production */

registrations.push(server.register(inert));
registrations.push(server.register(publicPlugin));

registrations.push(server.register({
  register: apiPlugin,
  options: {
    path: '/api'
  }
}));

registrations.push(server.register({
  register: schemaPlugin,
  options: {
    path: '/schema',
    apolloOptions: {
      pretty: true
    },
    route: {
      cors: true
    }
  }
}));

/* Additional plug-ins which will be loaded on development only */

if (nodeEnv == 'development') {
  registrations.push(server.register({
    register: apolloServer.graphiqlHapi,
    options: {
      path: '/playground',
      graphiqlOptions: {
        endpointURL: '/schema'
      }
    }
  }));
}

Promise.all(registrations)
  .then(() => {
    // Start the server
    server.start((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log();
      console.log('The server is running at:');
      console.log();
      console.log('  ' + chalk.cyan(`http://${host}:${port}/`));
      console.log();
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

if (dbEnabled) {
  // Configure mongoose
  mongoose.Promise = global.Promise;

  // Set MongoDB connection
  mongoose.connect(`mongodb://${host}:${dbPort}/whatsapp_${nodeEnv}`);
}
