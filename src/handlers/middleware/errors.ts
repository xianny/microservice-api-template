import { ErrorUtils as BaseErrorUtils } from '@0x/api-utils';
import { ErrorBodyWithHTTPStatusCode } from '@0x/api-utils/lib/src/errors';

export { isAPIError, isRevertError } from '@0x/api-utils';

class ErrorUtils extends BaseErrorUtils {
    public generateError(err: Error): ErrorBodyWithHTTPStatusCode {
        /* custom error transformations here */
        return super.generateError(err);
    }
}

const utils = new ErrorUtils();
export const errorHandler = utils.getErrorHandler();
