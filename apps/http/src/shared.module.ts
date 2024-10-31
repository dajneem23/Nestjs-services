import { HttpModule } from "@nestjs/axios";
import { Module, Global } from "@nestjs/common";

import { ConfigService } from "./shared/services/config.service";
import { GeneratorService } from "./shared/services/generator.service";
import { LoggerService } from "./shared/services/logger.service";
import { ValidatorService } from "./shared/services/validator.service";

const providers = [ConfigService, LoggerService, ValidatorService, GeneratorService];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}
