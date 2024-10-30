import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { JOI_DEFAULT_VALIDATION_OPTIONS } from '@/common/validations';
import { CREATE, JoiSchema, JoiSchemaOptions, JoiValidationGroups, UPDATE } from 'nestjs-joi';
import Joi from 'joi';

// {
//   "tokenName": "Kylin Network",
//   "tokenSymbol": "KYL",
//   "tokenLogo": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png",
//   "tokenDecimals": "18",
//   "usdPrice": 19.722370676,
//   "usdPriceFormatted": "19.722370676",
//   "24hrPercentChange": "-0.8842730258590583",
//   "exchangeAddress": "0x1f98431c8ad98523631ae4a59f267346ea31f984",
//   "exchangeName": "Uniswap v3",
//   "tokenAddress": "0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c",
//   "toBlock": "16314545",
//   "possibleSpam": "false",
//   "verifiedContract": true,
//   "pairAddress": "0x1f98431c8ad98523631ae4a59f267346ea31f984",
//   "pairTotalLiquidityUsd": "123.45"
// }

@JoiSchemaOptions(JOI_DEFAULT_VALIDATION_OPTIONS)
export class TokenPriceDto extends AbstractDto {
    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE], Joi.string().required())
    @JoiSchema([UPDATE], Joi.string())
    tokenName!: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema(Joi.string())
    tokenSymbol!: string;

    @ApiPropertyOptional({ type: 'string' })
    @JoiSchema([CREATE], Joi.string().allow(null).optional().default(''))
    @JoiSchema([UPDATE], Joi.string().optional())
    tokenLogo?: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE, UPDATE], Joi.string())
    tokenDecimals!: string;

    @ApiProperty({ type: 'number' })
    @JoiSchema([CREATE, UPDATE], Joi.number())
    usdPrice!: number;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE, UPDATE], Joi.string())
    usdPriceFormatted!: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE, UPDATE], Joi.string())
    hrPercentChange!: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE, UPDATE], Joi.string())
    exchangeAddress!: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE, UPDATE], Joi.string())
    exchangeName!: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE, UPDATE], Joi.string().regex(/^0x[a-fA-F0-9]{40}$/))
    tokenAddress!: string;

    @ApiPropertyOptional({ type: 'string' })
    @JoiSchema([CREATE], Joi.string().optional().default(''))
    @JoiSchema([UPDATE], Joi.string().optional())
    toBlock!: string;

    @ApiPropertyOptional({ type: 'boolean' })
    @JoiSchema([CREATE], Joi.boolean().optional().default(false))
    @JoiSchema([UPDATE], Joi.boolean().optional())
    possibleSpam?: boolean;

    @ApiPropertyOptional({ type: 'string' })
    @JoiSchema([CREATE], Joi.boolean().optional().default(false))
    @JoiSchema([UPDATE], Joi.boolean().optional())
    verifiedContract?: boolean;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE], Joi.string().regex(/^0x[a-fA-F0-9]{40}$/))
    @JoiSchema(
        [UPDATE],
        Joi.string()
            .regex(/^0x[a-fA-F0-9]{40}$/)
            .optional(),
    )
    pairAddress!: string;

    @ApiProperty({ type: 'string' })
    @JoiSchema([CREATE], Joi.string().default(''))
    @JoiSchema([UPDATE], Joi.string().optional())
    pairTotalLiquidityUsd?: string;
}
