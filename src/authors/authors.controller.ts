import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { CreateAuthorDTO } from './dto/createAuthorDTO';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}
  @Post()
  @HttpCode(200)
  createAuthor(@Body() body: CreateAuthorDTO): any {

    const author = this.authorService.create(body);
    return author
  }

  @Get()
  async getAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }
}
