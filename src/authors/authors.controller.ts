import { Controller, Post, Body, Get } from '@nestjs/common';
import CreateAuthorDTO from './DTO/createAuthor';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}
  @Post()
  createAuthor(@Body() body: CreateAuthorDTO): any {
    return this.authorService.create(body);
  }

  @Get()
  async getAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }
}
