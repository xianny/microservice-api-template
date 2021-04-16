import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { logger } from '../../utils/logger';

import * as config from './ormconfig';

let connection: Connection;

/**
 * Creates the DB connnection to use in an app
 */
export async function getHashalyticsConnectionAsync(): Promise<Connection> {
    if (connection === undefined) {
        logger.info('Creating connection to Hashalytics DB');
        connection = await createConnection(config as PostgresConnectionOptions);
    }
    return connection;
}
