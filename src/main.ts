import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(helmet());
  app.enableCors();
  app.use(compression());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cook Book')
    .setDescription('The cook book API description')
    .setVersion('1.0')
    .addTag('CookBook')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('PORT')).then(() => console.log('App running on port ' + config.get('PORT')));
}
bootstrap();
