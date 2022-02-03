import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule , ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';

import { Category } from './categories/categoty.entity';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/author.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) =>{
        return {
          type: "sqlite",
          //  host: "localhost",
          //  port: 3306,
          //  username: "root",
          //  password: "123",
          database: config.get<string>('DB_NAME'),
          entities: [Category, Book, Author],    
          synchronize: true
        }
      }      
      
    }),
    AuthorsModule,
    CategoriesModule,
    BooksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue:new ValidationPipe({ transform: true, whitelist:true})
    }
  ],
})
export class AppModule {}
