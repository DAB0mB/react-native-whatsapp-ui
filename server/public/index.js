import Async from 'async';
import fs from 'fs';
import pack from '../../package.json';

register.attributes = {
  name: 'public',
  version: pack.version
};

function register(server, options, next) {
  fs.readdir(__dirname, (err, fileNames) => {
    if (err) return next(err);

    // Filter all directories
    Async.filter(fileNames, (fileName, next) => {
      fs.stat(`${__dirname}/${fileName}`, (err, stat) => {
        if (err) return next(err);
        next(null, stat.isDirectory());
      });
    // Register a dedicated route for each of the directories
    }, (err, dirNames) => {
      if (err) return next(err);

      dirNames.forEach((dirName) => {
        server.route({
          method: 'GET',
          path: `/${dirName}/{path*}`,
          handler: {
            directory: {
              path: `./${dirName}`
            }
          }
        });
      });

      next();
    });
  });
}

export default register;
