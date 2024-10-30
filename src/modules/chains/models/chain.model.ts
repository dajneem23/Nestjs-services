import { CommonModel } from '@/common/model.common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenPriceRepository } from '../repositories/token-price.repository';

@Injectable()
export class TokenPriceModel extends CommonModel {
    constructor(
        @InjectRepository(TokenPriceRepository)
        public repository: TokenPriceRepository,
    ) {
        super();
    }
}
