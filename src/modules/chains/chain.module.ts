import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ChainsController } from './controllers/chains.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { ChainsService } from './services/chains.service';
import { TokenPriceRepository } from './repositories/token-price.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventHandlers } from './events/handlers';
import { PriceService } from './services/price.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenPriceModel } from './models/chain.model';
import { ModelsModule } from '@/models.module';

@Module({
    imports: [CqrsModule, ModelsModule],
    controllers: [ChainsController],
    providers: [ChainsService, PriceService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers],
    exports: [ChainsService, PriceService],
})
export class ChainModule {}
