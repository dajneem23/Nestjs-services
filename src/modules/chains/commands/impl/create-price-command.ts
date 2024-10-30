import { ICommand } from '@nestjs/cqrs';
import { TokenPriceDto } from '../../dtos/token-price.dto';

export class CreatePriceCommand implements ICommand {
    constructor(public readonly createPriceDto: TokenPriceDto) {}
}
