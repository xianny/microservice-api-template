// default values, can use for development
export const _default = {
    PORT: 3000,
    HOST: 'localhost',
    LOGGER_INCLUDE_TIMESTAMP: true,
    LOG_LEVEL: 'info',
    HASHALYTICS_URI: 'postgres://api:api@localhost:5432/hashalytics',
    POSTGRES_URI: 'postgres://postgres:fakepassword@localhost:5433/postgres',
    API_KEYS_ALL: [],
};

// parse env variables or fall back to default values
export const config = {
    // server configs
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : _default.PORT,
    HOST: process.env.HOST || _default.HOST,
    LOGGER_INCLUDE_TIMESTAMP:
        ((process.env.LOGGER_INCLUDE_TIMESTAMP as any) as boolean) || _default.LOGGER_INCLUDE_TIMESTAMP,
    // data sources
    HASHALYTICS_URI: process.env.HASHALYTICS_URI || _default.HASHALYTICS_URI,
    POSTGRES_URI: process.env.POSTGRES_URI || _default.POSTGRES_URI,
    // api keys
    API_KEYS_ALL: process.env.API_KEYS_ALL ? process.env.API_KEYS_ALL.split(',') : _default.API_KEYS_ALL,
    // TODO: Add more API key scopes here if needed
};

export const httpServiceConfig = {
    httpPort: config.PORT,
    healthcheckHttpPort: config.PORT,
    healthcheckPath: 'health',
    httpKeepAliveTimeout: 10,
    httpHeadersTimeout: 10,
    enablePrometheusMetrics: false,
    prometheusPort: 4000,
    prometheusPath: '',
};
