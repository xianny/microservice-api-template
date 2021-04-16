import chai from 'chai';
import StatusCodes from 'http-status-codes';
import supertest from 'supertest';

import { getAppAsync } from '../src/app';

const expect = chai.expect;

describe('API tests', () => {
    let app: any;

    before(async () => {
        app = await getAppAsync();
    });
    it(`should have some tests`, async () => {
        await supertest(app)
            .get('')
            .then((res) => {
                expect(res.status).equal(StatusCodes.OK);
            });
    });
});
