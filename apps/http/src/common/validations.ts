import { BaseValidationOptions } from 'joi';

export const JOI_DEFAULT_VALIDATION_OPTIONS: BaseValidationOptions = {
    allowUnknown: true,
    stripUnknown: false,
    abortEarly: true,
};
