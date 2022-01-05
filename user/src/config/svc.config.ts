import { registerAs } from '@nestjs/config';

export default registerAs('service', () => ({
  name: process.env['SERVICE_NAME'],
  database: {
    type: process.env['DB_TYPE'],
    name: process.env['DB_CONNECTION_NAME'],
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_DATABASE'],
    entities: [process.env['DB_ENTITIES']],
    migrations: [process.env['DB_MIGRATIONS']],
    logging: process.env['DB_LOGGING'],
    synchronize: process.env['DB_SYNCHRONIZE'],
    cli: {
      entitiesDir: process.env['DB_ENTITIES_DIR'],
      migrationsDir: process.env['DB_MIGRATIONS_DIR'],
    },
  },
}));
