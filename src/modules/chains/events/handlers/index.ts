import { TokenPriceUpdatedEvent } from '../impl/token-price-updated.event';
import { TokenPriceCreatedHandler } from './token-price-created.handler';
import { TokenPriceDeletedHandler } from './token-price-deleted.handler';

export const EventHandlers = [TokenPriceCreatedHandler, TokenPriceUpdatedEvent, TokenPriceDeletedHandler];
