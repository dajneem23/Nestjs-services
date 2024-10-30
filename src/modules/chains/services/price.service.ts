import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPriceDto } from '../dtos/get-price.dto';
import { GetPriceQuery } from '../queries/impl/get-price.query';
import { CreatePriceCommand } from '../commands/impl/create-price-command';
import { UpdatePriceCommand } from '../commands/impl/update-price-command';
import { DeletePriceCommand } from '../commands/impl/delete-price-command';
import { TokenPriceDto } from '../dtos/token-price.dto';
import { IdRequestParamsDto } from '../dtos/id-prams.dto';

@Injectable()
export class PriceService {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus,
    ) {}

    async getPrice(price: GetPriceDto) {
        return this._queryBus.execute(new GetPriceQuery(price));
    }

    async createPrice(price: TokenPriceDto) {
        return this._commandBus.execute(new CreatePriceCommand(price));
    }

    async updatePrice(price: TokenPriceDto) {
        return this._commandBus.execute(new UpdatePriceCommand(price));
    }

    async deletePrice(price: IdRequestParamsDto) {
        return this._commandBus.execute(new DeletePriceCommand(price));
    }
}
