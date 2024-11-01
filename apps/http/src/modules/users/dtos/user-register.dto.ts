'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { JOI_DEFAULT_VALIDATION_OPTIONS } from 'apps/http/src/common/validations';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions, JoiValidationGroups } from 'nestjs-joi';
@JoiSchemaOptions(JOI_DEFAULT_VALIDATION_OPTIONS)
export class UserRegisterDto {
    @ApiProperty({ example: 'John', type: 'string' })
    @JoiSchema([JoiValidationGroups.CREATE], Joi.string().required())
    readonly firstName!: string;

    @ApiProperty({ example: 'Doe', type: 'string' })
    @JoiSchema([JoiValidationGroups.CREATE], Joi.string().required())
    readonly lastName!: string;

    @ApiProperty({ example: 'JohnDoe@gmail.com', type: 'string' })
    @JoiSchema([JoiValidationGroups.CREATE], Joi.string().email().required())
    readonly email!: string;
}
