import './boilerplate.polyfill';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreCqrsModule } from 'nestjs-eventstore';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { eventStoreBusConfig } from './providers/event-bus.provider';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared.module';
import { ChainModule } from './modules/chains/chain.module';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from './models.module';
import { JoiPipeModule } from 'nestjs-joi';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { AppConfig } from './app.config';
import { UsersModule } from './modules/users/users.module';

@Module({
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
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike(AppConfig.APP_NAME, {
                            prettyPrint: true,
                        }),
                    ),
                }),

                new winston.transports.File({
                    filename: './logs/app_error.log',
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike(AppConfig.APP_NAME, {
                            prettyPrint: true,
                        }),
                    ),
                }),

                new winston.transports.File({
                    filename: './logs/app_combined.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike(AppConfig.APP_NAME, {
                            prettyPrint: true,
                        }),
                    ),
                }),

                // other transports...
            ],
            // other options
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
        ChainModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
