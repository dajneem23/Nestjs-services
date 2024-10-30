import { Logger } from '@nestjs/common';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TokenPriceDeletedEvent } from '../impl/token-price-deleted.event';

@EventsHandler(TokenPriceDeletedEvent)
export class TokenPriceDeletedHandler implements IEventHandler<TokenPriceDeletedEvent> {
    handle(event: TokenPriceDeletedEvent) {
        Logger.log(event, 'TokenPriceUpdatedEvent'); // write here
    }
}
