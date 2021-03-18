import logger from '@poppinss/fancy-logs';
import Mongoose from 'mongoose';

let dbURI = 'mongodb://localhost/pruebaExpress';

Mongoose.connect(dbURI);

Mongoose.connection.on('connected', () => {
    logger.success(`Mongoose connected to ${dbURI}`);
});
Mongoose.connection.on('error', err => {
    logger.error('Mongoose connection error:', err);
});
Mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose disconnected');
});

const gracefulShutdown = (msg: string, callback: () => (void)) => {
    Mongoose.connection.close(() => {
        logger.success(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

import "./User";