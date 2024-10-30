import { ICommand } from '@nestjs/cqrs';
import { TokenPriceDto } from '../../dtos/token-price.dto';

export class UpdatePriceCommand implements ICommand {
    constructor(public readonly updatePriceDto: TokenPriceDto) {}
}
