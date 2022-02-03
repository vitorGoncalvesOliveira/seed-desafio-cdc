import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity'
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthorsService', () => {
  let service: AuthorsService;

  const fakeAuthorRepository = {
      author: [],
      save:(author) => {
        

        author.createdAt = new Date()
        fakeAuthorRepository.author.push(author)

        return author
      },
      findOne:({email}) => {
          
          const user = fakeAuthorRepository.author.find(actor => actor.email === email )

          return user;
      }
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

  
  it('should create a user in database',async () => {
    const author = await service.create({nome:'John Doe',email:'Johndoe@doe.com',descricao:'teste apenas'})

    expect(author.createdAt).toBeDefined();
    expect(author.nome).toBe('John Doe')
    
  });

  it('should not create a user with email already exist',async () => {
    try{
      await service.create({nome:'John Doe',email:'Johndoe@doe.com',descricao:'teste apenas'})
      await service.create({nome:'John Doe',email:'Johndoe@doe.com',descricao:'teste apenas'})
    
    }catch(erro){
           
      expect(erro.status).toBe(400)
      expect(erro.response.message).toBe('Email already in use');
              
    }
    
  });
});
