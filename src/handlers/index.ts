import { Request, Response } from 'express';
import { ContextRequest, ContextResponse, GET, Path } from 'typescript-rest';

// TODO: Create more handlers in this folder, and export them here

@Path('/')
export class RootHandler {
    @GET
    // If you don't need the request and response objects, you can directly
    // pass path, query, and body params in the method arguments
    // tslint:disable-next-line:prefer-function-over-method
    public root(@ContextRequest request: Request, @ContextResponse response: Response): { message: string } {
        request.log
            .child({ foo: 'bar', something: 'anything' })
            .info(
                `An example log msg associated with this request. Object fields will be appended in log-parseable format.`,
            );
        return {
            message: `This is the root of the 0x Data API.`,
        };
    }
}
