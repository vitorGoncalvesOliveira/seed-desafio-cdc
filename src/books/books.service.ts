import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const bookAlreadyExist = await this.checkIfExist(
      createBookDto.titulo,
      createBookDto.isbn,
    );
    if (bookAlreadyExist) {
      throw new BadRequestException('Book already exist');
    }
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({ relations: ['category', 'author'] });
  }

  findOne(id: number) {
    return this.bookRepository.findOne({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  checkIfExist(titulo: string, isbn: string) {
    return this.bookRepository.findOne({ where: [{ titulo }, { isbn }] });
  }
}
