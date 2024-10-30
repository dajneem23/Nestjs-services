import { IAggregateEvent } from 'nestjs-eventstore';
import { TokenPriceDto } from '../../dtos/token-price.dto';

export class TokenPriceAbstractEvent implements IAggregateEvent {
    constructor(public readonly tokenPriceDto: TokenPriceDto) {}
    get streamName() {
        return `users-${this.tokenPriceDto.id}`;
    }
}
