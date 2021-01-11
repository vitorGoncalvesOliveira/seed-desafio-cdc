import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/authors.service';

@Module({
  imports: [],
  controllers: [AppController, AuthorsController],
  providers: [AppService, AuthorsService],
})
export class AppModule {}
