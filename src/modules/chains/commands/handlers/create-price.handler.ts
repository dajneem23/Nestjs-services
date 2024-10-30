import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from 'nestjs-eventstore';
import { TokenPriceRepository } from '../../repositories/token-price.repository';
import { CreatePriceCommand } from '../impl/create-price-command';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPriceModel } from '../../models/chain.model';

@CommandHandler(CreatePriceCommand)
export class CreatePriceHandler implements ICommandHandler<CreatePriceCommand> {
    constructor(
        private readonly _model: TokenPriceModel,
        private readonly _publisher: EventPublisher,
    ) {}

    async execute(command: CreatePriceCommand) {
        Logger.log('Async CreatePriceHandler...', 'CreatePriceCommand');
        const { createPriceDto } = command;
        console.log('CreatePriceCommand ->', createPriceDto);
        const price = this._publisher.mergeObjectContext(await this._model.repository.createTokenPrice(createPriceDto));
        price.commit();
    }
}
