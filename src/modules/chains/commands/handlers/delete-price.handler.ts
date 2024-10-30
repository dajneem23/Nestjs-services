import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from 'nestjs-eventstore';
import { TokenPriceRepository } from '../../repositories/token-price.repository';

import { TokenPriceModel } from '../../models/chain.model';
import { DeletePriceCommand } from '../impl/delete-price-command';

@CommandHandler(DeletePriceCommand)
export class DeletePriceHandler implements ICommandHandler<DeletePriceCommand> {
    constructor(
        private readonly _model: TokenPriceModel,
        private readonly _publisher: EventPublisher,
    ) {}

    async execute(command: DeletePriceCommand) {
        Logger.log('Async DeletePriceHandler...', 'DeletePriceCommand');
        const { deletePriceDto } = command;
        const price = this._publisher.mergeObjectContext(await this._model.repository.deleteTokenPrice(deletePriceDto));
        price.commit();
    }
}
