import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categoty.entity';
import { CreateCategoryDTO } from './dto/createCategoryDTO';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(body: CreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExist = await this.categoryRepository.findOne({
      nome: body.nome,
    });
    
    if (categoryAlreadyExist) {      
      throw new BadRequestException('Categoria já cadastrada');
    }

    const category = await this.categoryRepository.save(body);
    return category;
  }

  findALl(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
