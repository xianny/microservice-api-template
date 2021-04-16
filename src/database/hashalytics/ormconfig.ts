import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { config as appConfig } from '../../config';

const config: PostgresConnectionOptions = {
    name: 'hashalytics',
    type: 'postgres',
    synchronize: false,
    logging: true,
    logger: 'debug',
    extra: {
        max: 15,
        statement_timeout: 60000,
    },
    url: appConfig.HASHALYTICS_URI,
};

module.exports = config;
