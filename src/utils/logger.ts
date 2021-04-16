/**
 * Setup the logger.
 */

import pino from 'pino';

import { config } from '../config';
export const logger = pino({
    useLevelLabels: true,
    timestamp: config.LOGGER_INCLUDE_TIMESTAMP,
});
