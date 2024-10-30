import { IQuery } from '@nestjs/cqrs';
import { GetPriceDto } from '../../dtos/get-price.dto';

export class GetPriceQuery implements IQuery {
    constructor(public readonly query: GetPriceDto) {}
}
