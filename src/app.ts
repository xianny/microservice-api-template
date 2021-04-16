import { createDefaultServer } from '@0x/api-utils';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'typescript-rest';

import { httpServiceConfig } from './config';
import { DOCS_PATH } from './constants';
import * as docs from './docs/swagger.json';
import { RootHandler } from './handlers';
import { errorHandler } from './handlers/middleware';
import { ApiKeyAuthenticator } from './handlers/middleware/authentication';
import { logger } from './utils/logger';

/**
 * Creates and returns an instance of the Data API server
 */
export async function getAppAsync(): Promise<Express> {
    const app = express();
    createDefaultServer(httpServiceConfig, app, logger, async () => Promise.resolve());

    // Add documentation
    app.use(DOCS_PATH, swaggerUi.serve, swaggerUi.setup(docs, {explorer: true}));

    // Register routes
    Server.registerAuthenticator(ApiKeyAuthenticator);
    Server.buildServices(app, RootHandler); // Add more handlers here

    // Handle uncaught errors, load this last
    app.use(errorHandler);
    return app;
}
