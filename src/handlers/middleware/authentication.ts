import { InvalidAPIKeyError } from '@0x/api-utils';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { ServiceAuthenticator } from 'typescript-rest';
import validate from 'uuid-validate';

import { config } from '../../config';

enum Roles {
    WriteQuotes = 'write:quotes',
    ReadTransactionSources = 'read:transaction-sources',
}

const API_KEY_CONFIGS: { [role: string]: string[] } = {};

export const ApiKeyAuthenticator: ServiceAuthenticator = {
    getRoles: (req: Request): string[] => {
        const apiKey = req.header('0x-api-key');
        if (apiKey === undefined || !validate(apiKey)) {
            throw new InvalidAPIKeyError();
        }
        if (config.API_KEYS_ALL.includes(apiKey)) {
            return Object.values(Roles);
        } else {
            const roles: string[] = [];
            Object.entries(API_KEY_CONFIGS).forEach(([role, keyList]) => {
                if (keyList.includes(apiKey)) {
                    roles.push(role);
                }
            });
            return roles;
        }
    },
    initialize: (router: Router): void => {
        router.use(ApiKeyAuthenticator.getMiddleware());
    },
    getMiddleware: (): RequestHandler => {
        return (req: Request, res: Response, next: NextFunction) => {
            next();
        };
    },
};
