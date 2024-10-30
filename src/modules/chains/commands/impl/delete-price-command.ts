import { ICommand } from '@nestjs/cqrs';
import { IdRequestParamsDto } from '../../dtos/id-prams.dto';

export class DeletePriceCommand implements ICommand {
    constructor(public readonly deletePriceDto: IdRequestParamsDto) {}
}
