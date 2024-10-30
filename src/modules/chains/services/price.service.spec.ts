import { PriceService } from './price.service';
import { Test, TestingModule } from '@nestjs/testing';
import Moralis from 'moralis';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TerminusModule } from '@nestjs/terminus';
import { ChainModule } from '../chain.module';
import { SharedModule } from '@/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@/shared/services/config.service';
import { ModelsModule } from '@/models.module';
import { TokenPriceModel } from '../models/chain.model';
import { HealthModule } from '@/modules/health/health.module';
import { eventStoreBusConfig } from '@/providers/event-bus.provider';
import { ConfigModule } from '@nestjs/config';
import { EventStoreCqrsModule } from 'nestjs-eventstore';
import { TokenPriceDto } from '../dtos/token-price.dto';

describe('PriceService', () => {
    let priceService: PriceService;
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(), // ensure you have a configuration module
                TypeOrmModule.forRootAsync({
                    imports: [SharedModule],
                    useFactory: (configService: ConfigService) => configService.typeOrmConfig,
                    inject: [ConfigService],
                }),
                EventStoreCqrsModule.forRootAsync(
                    {
                        useFactory: async (config: ConfigService) => {
                            return {
                                connectionSettings: config.eventStoreConfig.connectionSettings,
                                endpoint: config.eventStoreConfig.tcpEndpoint,
                            };
                        },
                        inject: [ConfigService],
                    },
                    eventStoreBusConfig,
                ),
                HealthModule,
                TerminusModule,
                ModelsModule,
                ChainModule,
            ],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        priceService = app.get<PriceService>(PriceService);
    });

    // describe('getPrice', () => {
    //     it('should return "Hello World!"', async () => {
    //         expect(await priceService.getPrice({})).toEqual('Hello World!');
    //     });
    // });

    it('should return TokenPrice', async () => {
        expect(
            await priceService.getPrice({
                id: '1',
            }),
        ).toReturn();
    });

    it('should return createPriceDto', async () => {
        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY,
        });

        const price = (
            await Moralis.EvmApi.token.getTokenPrice({
                chain: '0x1',
                include: 'percent_change',
                address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
            })
        ).toJSON();
        console.log({ price });
        // const createPriceDto: TokenPriceDto = {
        //     id: '1',
        //     tokenName: price.tokenName!,
        //     tokenSymbol: price.tokenSymbol!,
        //     tokenAddress: price.tokenAddress!,
        //     tokenLogo: price.tokenLogo!,
        //     tokenDecimals: price.tokenDecimals!,
        //     usdPrice: price.usdPrice!,
        //     usdPriceFormatted: price.usdPriceFormatted!,
        //     hrPercentChange: price['24hrPercentChange']!,
        //     exchangeAddress: price.exchangeAddress!,
        //     exchangeName: price.exchangeName!,
        //     toBlock: price.toBlock!,
        //     pairAddress: '',
        // };

        // expect(await priceService.createPrice(createPriceDto));
    });
});
