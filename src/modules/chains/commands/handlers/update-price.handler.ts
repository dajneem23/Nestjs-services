import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from 'nestjs-eventstore';
import { ConfigService } from '@/shared/services/config.service';
import { WETH_CONTRACT_ADDRESS } from '@/assets/variable';
import { UpdatePriceCommand } from '../impl/update-price-command';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPriceModel } from '../../models/chain.model';

@CommandHandler(UpdatePriceCommand)
export class UpdatePriceHandler implements ICommandHandler<UpdatePriceCommand> {
    constructor(
        private readonly _model: TokenPriceModel,
        private readonly _publisher: EventPublisher,
    ) {}

    async execute(command: UpdatePriceCommand) {
        Logger.log('Async UpdatePriceHandler...', 'UpdatePriceCommand');
        const { updatePriceDto } = command;
        const price = this._publisher.mergeObjectContext(await this._model.repository.updateTokenPrice(updatePriceDto));
        price.commit();
    }
}
