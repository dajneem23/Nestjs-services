import './boilerplate.polyfill';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

import { EventStoreCqrsModule } from 'nestjs-eventstore';
import { JoiPipeModule } from 'nestjs-joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './models.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { eventStoreBusConfig } from './providers/event-bus.provider';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot(), // ensure you have a configuration module
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => configService.mongoConfig,
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
        WinstonModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => configService.winstonConfig,
            inject: [ConfigService],
        }),
        JoiPipeModule.forRoot({
            pipeOpts: {
                usePipeValidationException: true,
                defaultValidationOptions: {
                    abortEarly: false,
                    allowUnknown: true,
                    stripUnknown: true,
                    debug: true,
                },
            },
        }),
        HealthModule,
        TerminusModule,
        ModelsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
