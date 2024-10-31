import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "apps/http/src/common/dto/abstract.dto";
import { JOI_DEFAULT_VALIDATION_OPTIONS } from "apps/http/src/common/validations";
import { Exclude, Expose } from "class-transformer";
import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

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
    @ApiProperty({ type: "string" })
    @JoiSchema(Joi.string())
    readonly lastName!: string;

    @Expose()
    @ApiProperty({ example: "JohnDoe@gmail.com", type: "string" })
    @JoiSchema(Joi.string().email().required())
    readonly email!: string;
}
