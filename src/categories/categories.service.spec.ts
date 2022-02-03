import { Test, TestingModule,  } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './categoty.entity'


describe('CategoriesService', () => {
  let service: CategoriesService;
  const fakeCategoryRepository = {
    categories:[],
    save:(body) =>{ 
      fakeCategoryRepository.categories.push(body)
      
      return body
    },
    findOne: (categoria) => {
      const category = fakeCategoryRepository.categories.find(category => category.nome === categoria.nome)
      console.log(category)
      return category
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,{
          provide: getRepositoryToken(Category),
          useValue: fakeCategoryRepository 
      }],      
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should thown a exception when category already created', async () =>{
    await service.create({nome: 'teste'})
    try{
      await service.create({nome: 'Teste'})
    }catch(error){
    
      expect(error.status).toBe(500)
      expect(error.response.error).toBe('Categoria teste já existe.')
    }
  });

});
