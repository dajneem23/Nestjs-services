import { TokenPriceRepository } from './modules/chains/repositories/token-price.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceModel } from './modules/chains/models/chain.model';
import { TokenPrice } from './modules/chains/entities/token-price.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TokenPrice])],
    providers: [TokenPriceModel, TokenPriceRepository],
    exports: [TokenPriceModel, TokenPriceRepository],
})
export class ModelsModule {}
