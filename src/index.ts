import { getAppAsync } from './app';
import { config } from './config';
import { logger } from './utils/logger';

if (require.main === module) {
    startServerAsync().catch((e) => {
        logger.error(e);
    });
}

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    if (err) {
        logger.error(err);
    }
});
async function startServerAsync(): Promise<void> {
    const app = await getAppAsync();

    // Start the server
    const port = Number(config.PORT);
    app.listen(port, () => {
        logger.info(`Express server started on port: ${port}`);
    });
}
