import { JOI_DEFAULT_VALIDATION_OPTIONS } from '@/common/validations';
import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions, JoiValidationGroups } from 'nestjs-joi';

@JoiSchemaOptions(JOI_DEFAULT_VALIDATION_OPTIONS)
export class IdRequestParamsDto {
    @ApiProperty({ type: 'string' })
    @JoiSchema([JoiValidationGroups.DEFAULT], Joi.string().required())
    id!: string;
}
