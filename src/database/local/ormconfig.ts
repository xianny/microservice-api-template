import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { config as appConfig } from '../../config';

import { DexName } from './entities/Dex';
import { QuoteEntity } from './entities/Quote';
import { QuotePriceComparisonEntity } from './entities/QuotePriceComparison';

const entities: any[] = [DexName, QuoteEntity, QuotePriceComparisonEntity];

const config: PostgresConnectionOptions = {
    name: 'default',
    type: 'postgres',
    entities,
    migrations: ['./lib/src/database/local/migrations/*.js'],
    synchronize: process.env.SYNC_DB === 'true', // for staging
    logging: true,
    logger: 'debug',
    extra: {
        max: 15,
        statement_timeout: 60000,
    },
    url: appConfig.POSTGRES_URI,
    namingStrategy: new SnakeNamingStrategy(),
};

module.exports = config;
