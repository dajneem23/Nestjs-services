import { GetPriceQuery } from './../impl/get-price.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LoggerService } from '../../../../shared/services/logger.service';
import { TokenPriceDto } from '../../dtos/token-price.dto';
import { TokenPriceModel } from '../../models/chain.model';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetPriceQuery)
export class GetPriceHandler implements IQueryHandler<GetPriceQuery> {
    constructor(
        private readonly _model: TokenPriceModel,
        private readonly _logger: LoggerService,
    ) {}

    async execute(getPriceQuery: GetPriceQuery): Promise<TokenPriceDto> {
        this._logger.log('[query] Async GetPriceQuery...');
        console.log('GetPriceQuery', getPriceQuery);
        const { query } = getPriceQuery;
        const price = await this._model.repository.findOne({ where: { id: query.id } });
        if (!price) {
            throw new NotFoundException();
        }
        return price.toDto();
    }
}
