import { assert as baseAssert } from '@0x/assert';

import { ValidationError, ValidationErrorCodes } from '@0x/api-utils';

export const assert = Object.fromEntries(
    Object.entries(baseAssert).map((entry) => {
        const [key, fn] = entry;
        return [key, assertOrThrowValidationError(fn)];
    }),
);

// tslint:disable-next-line:ban-types
function assertOrThrowValidationError<F extends Function>(assertFn: F): (...args: any[]) => void {
    return (...args: any[]) => {
        try {
            assertFn.apply(assertFn, args);
        } catch (e) {
            throw new ValidationError([
                {
                    field: args[0] as string,
                    code: ValidationErrorCodes.FieldInvalid,
                    reason: e.message,
                },
            ]);
        }
    };
}
