import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categoty.entity';
import { CreateCategoryDTO } from './DTO/createCategoryDTO';

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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Categoria ${body.nome} já existe.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.categoryRepository.save(body);
    return category;
  }

  findALl(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
