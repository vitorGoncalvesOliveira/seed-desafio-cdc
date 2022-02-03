import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book  } from './entities/book.entity'

describe('BooksService', () => {
  let service: BooksService;

  let fakeBookRepository = { 

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, {
        provide: getRepositoryToken(Book),
        useValue: fakeBookRepository
      }],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
});
