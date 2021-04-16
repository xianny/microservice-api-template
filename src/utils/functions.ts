import { ValidationErrorCodes, ValidationErrorItem } from '@0x/api-utils';
import { BigNumber } from '@0x/utils';
/**
 * Removes all undefined fields from an object
 */
export function removeUndefined(object: object): object {
    return JSON.parse(JSON.stringify(object, (_, value) => value ?? undefined));
}

/**
 * Replaces all string number fields with BigNumber
 */
export function numberize<T extends { [key: string]: any }>(o: { [key: string]: any }): T {
    const regexp = /^[-+]?[0-9]*\.?[0-9]+$/;
    const keys = Object.keys(o);
    keys.forEach((k) => {
        if (typeof o[k] === 'string' && o[k].match(regexp)) {
            o[k] = new BigNumber(o[k]);
        }
        if (typeof o[k] === 'object' && o[k] !== null && !(o[k] instanceof BigNumber)) {
            o[k] = numberize(o[k]);
        }
    });
    return o as T;
}

export const MissingFieldValidationError = (field: string): ValidationErrorItem => {
    return {
        field,
        code: ValidationErrorCodes.RequiredField,
        reason: `MISSING_REQUIRED_FIELD`,
    };
};
