import { Length, Min, MinDate, IsNotEmpty, isNotEmpty } from 'class-validator';
import { Category } from '../../categories/categoty.entity';
import { Author } from '../../authors/author.entity';
import { Expose } from 'class-transformer';

export class CreateBookDto {
  @Length(1)
  titulo: string;

  @IsNotEmpty()
  sumario: string;

  @Length(1, 500)
  resume: string;

  @Min(20)
  preco: number;

  @Min(100)
  page: number;

  @IsNotEmpty()
  isbn: string;
  
  @IsNotEmpty()
  data_publicacao: Date;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  author: Author;
}
