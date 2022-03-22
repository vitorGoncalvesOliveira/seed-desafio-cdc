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

      return category
    },
    find: () =>{
      return  fakeCategoryRepository.categories
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

  it('should be save category', async () =>{
    
    await service.create({nome: 'categoria'})
    const category = await service.findALl();
    expect(category[0].nome).toBe('categoria')

  });
  

  it('should thown a exception when category already created', async () =>{
    await service.create({nome: 'Teste'})
    try{      
      await service.create({nome: 'Teste'})
    }catch(error){      
      expect(error.status).toBe(400)
      expect(error.response.message).toBe('Categoria já cadastrada')
    }
  });

});
