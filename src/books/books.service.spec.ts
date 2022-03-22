import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';

import { Book  } from './entities/book.entity'

describe('BooksService', () => {
  let service: BooksService;

  let fakeBookRepository = { 
    books: [],
    findOne:( { where } ) => {    
      const [ titulo, isbn ] = where

      return fakeBookRepository.books.find(book => book.titulo === titulo.titulo || book.isbn === isbn.isbn)    
    },
    find: () => {
      return fakeBookRepository.books;
    },
    save: (book) => {
      return fakeBookRepository.books.push(book);
    }

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

  it('should be return error, when duplicate title',async () => {
    try{
      await service.create({titulo:'teste',isbn:'123', page:10,resume:'dafda', preco:1, sumario:'12',data_publicacao: new Date() })
      await service.create({titulo:'teste',isbn:'123', page:10,resume:'dafda', preco:1, sumario:'12',data_publicacao: new Date() })
    }catch(e){
      expect(e.status).toBe(400)
      expect(e.message).toBe('Livro já existente')
    }

  })
  
});
