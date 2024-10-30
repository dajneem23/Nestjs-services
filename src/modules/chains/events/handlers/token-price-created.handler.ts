import { Logger } from '@nestjs/common';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TokenPriceCreatedEvent } from '../impl/token-price-created.event';

@EventsHandler(TokenPriceCreatedEvent)
export class TokenPriceCreatedHandler implements IEventHandler<TokenPriceCreatedEvent> {
    handle(event: TokenPriceCreatedEvent) {
        Logger.log(event, 'TokenPriceCreatedEvent'); // write here
    }
}
