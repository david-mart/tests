/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StoplightElementsModule } from 'nestjs-stoplight-elements';

import { AppModule } from './app/app.module';
import DESCRIPTION from '../docs/guidelines.md';

import { capitalCase } from 'change-case';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Upgrade - Second Look API')
    .setDescription(DESCRIPTION)
    .setBasePath('/api')
    .setVersion('1.0')
    .addTag('upgrade')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // linkNameFactory:
    operationIdFactory: (controllerKey, methodKey) =>
      capitalCase(methodKey),
  });

  const StoplightElements = new StoplightElementsModule(app, document, {
    router: 'hash',
    layout: 'sidebar',
    logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI1NCIgdmlld0JveD0iMCAwIDQ0IDU0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTQ0IDEyLjA1MDhMMzYuNTUzMiAxMi4wNTA4SDM2LjA1NjhMNDQgMTkuOTk0VjEyLjA1MDhaIiBmaWxsPSIjRUFDNDFDIi8+CjxwYXRoIGQ9Ik0yNi43NzQ5IDBMMjQuMTgxMSAwTDI0LjAwODIgMEwyNi43NzQ5IDIuNzY2NzNWMFoiIGZpbGw9IiNFQUM0MUMiLz4KPHBhdGggZD0iTTM2LjA1NjkgMS4zMzk4NEwzNC43MTgyIDEuMzM5ODRIMzQuNjI4OUwzNi4wNTY5IDIuNzY3ODRWMS4zMzk4NFoiIGZpbGw9IiNFQUM0MUMiLz4KPHBhdGggZD0iTTM4LjU1NTcgMi43NjU2MkwzNi4yMTI5IDIuNzY1NjJIMzYuMDU2OEwzOC41NTU3IDUuMjY0NjFWMi43NjU2MloiIGZpbGw9IiNFQUM0MUMiLz4KCjxwYXRoIGQ9Ik0zNi4wNTY4IDEyLjA1MDhMMTEuNjI0OCAxMi4wNTA4SDkuOTk1OTdMMzYuMDU2OCAzOC4xMTE2VjEyLjA1MDhaIiBmaWxsPSIjRUFDNDFDIi8+Cgo8cGF0aCBkPSJNMzIuMDQwNiAzOC4xMDk0SDE3LjIzMDdIMTYuMjQzNEwzMi4wNDA2IDUzLjkwNjVWMzguMTA5NFoiIGZpbGw9IiNFQUM0MUMiLz4KPHBhdGggZD0iTTkuOTk2MDQgMjIuMzEyNUg2LjQ4MTg0SDYuMjQ3NTZMOS45OTYwNCAyNi4wNjFWMjIuMzEyNVoiIGZpbGw9IiNFQUM0MUMiLz4KPHBhdGggZD0iTTkuOTk1OTYgMjYuMzI4MUgzLjA1MTI0SDIuNTg4MjZMOS45OTU5NiAzMy43MzU4VjI2LjMyODFaIiBmaWxsPSIjRUFDNDFDIi8+CjxwYXRoIGQ9Ik05Ljk5NTg3IDYuMjQ2MDlMNC44MDgyNCA2LjI0NjA5SDQuNDYyNEw5Ljk5NTg3IDExLjc3OTZWNi4yNDYwOVoiIGZpbGw9IiNFQUM0MUMiLz4KPHBhdGggZD0iTTM2LjA1NjggMi43NjU2MkwyNy4zNTUgMi43NjU2MkgyNi43NzQ5TDM2LjA1NjggMTIuMDQ3NlYyLjc2NTYyWiIgZmlsbD0iI0VBQzQxQyIvPgo8cGF0aCBkPSJNNDEuODU4IDM4LjEwOTRIMzYuNDE5M0gzNi4wNTY4TDQxLjg1OCA0My45MTA2VjM4LjEwOTRaIiBmaWxsPSIjRUFDNDFDIi8+CjxwYXRoIGQ9Ik0zNi4wNTY5IDM4LjEwOTRIMzIuMjkxN0gzMi4wNDA2TDM2LjA1NjkgNDIuMTI1NlYzOC4xMDk0WiIgZmlsbD0iI0VBQzQxQyIvPgo8cGF0aCBkPSJNOS45OTU5NCAxMi4wNTA4TDAuNjI0NzQ2IDEyLjA1MDhIMEw5Ljk5NTk0IDIyLjA0NjdMOS45OTU5NCAxMi4wNTA4WiIgZmlsbD0iI0VBQzQxQyIvPgo8L3N2Zz4=',
  });

  await StoplightElements.start('/docs');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
