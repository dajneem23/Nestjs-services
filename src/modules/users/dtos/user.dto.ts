import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '@/common/dto/abstract.dto';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { JOI_DEFAULT_VALIDATION_OPTIONS } from '@/common/validations';

@Exclude()
@JoiSchemaOptions(JOI_DEFAULT_VALIDATION_OPTIONS)
export class UserDto extends AbstractDto {
    @Expose()
    @ApiProperty()
    @JoiSchema(Joi.string())
    readonly id!: string;

    @Expose()
    @ApiProperty()
    @JoiSchema(Joi.string())
    readonly firstName!: string;

    @Expose()
    @ApiProperty({ type: 'string' })
    @JoiSchema(Joi.string())
    readonly lastName!: string;

    @Expose()
    @ApiProperty({ example: 'JohnDoe@gmail.com', type: 'string' })
    @JoiSchema(Joi.string().email().required())
    readonly email!: string;
}
