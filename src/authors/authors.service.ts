import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import CreateAuthorDTO from './DTO/createAuthor';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async create(author: CreateAuthorDTO): Promise<Author> {
    const newAuthor = await this.authorRepository.save(author);
    return newAuthor;
  }
}
