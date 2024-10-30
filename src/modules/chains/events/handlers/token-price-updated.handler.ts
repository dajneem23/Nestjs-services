import { Logger } from '@nestjs/common';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TokenPriceUpdatedEvent } from '../impl/token-price-updated.event';

@EventsHandler(TokenPriceUpdatedEvent)
export class TokenPriceUpdatedHandler implements IEventHandler<TokenPriceUpdatedEvent> {
    handle(event: TokenPriceUpdatedEvent) {
        Logger.log(event, 'TokenPriceUpdatedEvent'); // write here
    }
}
