import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';
import { faker } from '@faker-js/faker';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new ConsoleLogger();
  const userService = app.get(UserService);

  logger.log('Seeding users...');
  // create 3 users
  for (let i = 0; i < 3; i++) {
    logger.log(`Creating user ${i + 1}`);
    await userService.create({
      email: `test${i + 1}@test.com`,
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      password: 'testtest',
    });
    logger.log(`User ${i + 1} created`);
  }
  logger.log('Users seeded');

  await app.close();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
