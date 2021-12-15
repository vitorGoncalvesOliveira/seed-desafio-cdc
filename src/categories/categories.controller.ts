import { Controller, Post, Get, Body } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/createCategoryDTO';
import { Category } from './categoty.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  CreateCategory(@Body() category: CreateCategoryDTO): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoriesService.findALl();
  }
}
