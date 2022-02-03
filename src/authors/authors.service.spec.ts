import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity'
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthorsService', () => {
  let service: AuthorsService;

  let fakeAuthorRepository ={

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService, {
        provide: getRepositoryToken(Author),
        useValue: fakeAuthorRepository
      }],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
