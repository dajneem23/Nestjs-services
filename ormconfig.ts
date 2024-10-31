import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'apps/http/src/shared/typeorm/strategies/snake-naming.strategy';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT!,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['src/modules/**/*.entity{.ts,.js}', 'apps/**/src/modules/**/*.entity{.ts,.js}'],
    migrations: ['./migrations/*{.ts,.js}'],
} satisfies DataSourceOptions;

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
