import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDTO } from './dto/createAuthorDTO';

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
    await this.emailAlreadyInUse(author.email)

    const newAuthor = await this.authorRepository.save(author);
    return newAuthor;
  }

  async emailAlreadyInUse(email: string){
    const isInUse = await this.authorRepository.findOne({email})
    if(isInUse){
      throw new BadRequestException('Email already in use');
    }
  }
}
