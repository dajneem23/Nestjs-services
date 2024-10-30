import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet'; // security feature
import morgan from 'morgan'; // HTTP request logger

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from './shared/services/config.service';
import { LoggerService } from './shared/services/logger.service';
import { setupSwagger } from './shared/swagger/setup';
import { SharedModule } from './shared.module';
import { JoiExceptionFilter } from './filters/joi-exception.filter';
import { CustomReturnFieldsInterceptor } from './middlewares/custom-return-fields.interceptor';
import { JoiPipe } from 'nestjs-joi';
import { SqlErrorInterceptor } from './interceptors/sql-error.interceptor';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true });

    const loggerService = app.select(SharedModule).get(LoggerService);

    app.useLogger(loggerService);
    app.use(
        morgan('combined', {
            stream: {
                write: (message) => {
                    loggerService.log(message);
                },
            },
        }),
    );

    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );

    const reflector = app.get(Reflector);

    app.useGlobalFilters(new JoiExceptionFilter(), new HttpExceptionFilter(loggerService));

    app.useGlobalInterceptors(
        // Only use the SQL error interceptor in development
        ...(process.env.NODE_ENV == 'development' ? [new SqlErrorInterceptor()] : []),
        new ClassSerializerInterceptor(reflector),
        new CustomReturnFieldsInterceptor(),
    );

    app.useGlobalPipes(
        //class-transformer and class-validator are included in ValidationPipe
        // new ValidationPipe({
        //     transform: true, // Automatically transform payloads to match DTO types
        //     whitelist: true, // Strip properties not defined in the DTO
        //     forbidNonWhitelisted: true, // Throw an error if non-defined properties are present
        //     validationError: { target: false }, // Hide details of the DTO itself in the error
        //     // exceptionFactory: (errors) => {
        //     //     // Customize error messages
        //     //     return new Error(
        //     //         errors.map((err) => ({
        //     //             field: err.property,
        //     //             errors: Object.values(err.constraints),
        //     //         })),
        //     //     );
        //     // },
        // }),
        new JoiPipe(),
    );

    const configService = app.select(SharedModule).get(ConfigService);

    if (['development', 'staging'].includes(configService.nodeEnv)) {
        setupSwagger(app, configService.swaggerConfig);
    }

    const port = configService.getNumber('PORT') || 3000;
    const host = configService.get('HOST') || '127.0.0.1';
    await app.listen(port, host);

    loggerService.warn(`server running on port ${host}:${port}`);

    /*
     if GRPC is needed, import src/shared/grpc/setup.ts
     await setupGrpc(app, 'role', 'role.proto', configService.services?.auth?.grpcPort || 7900);
     */
}
bootstrap();
