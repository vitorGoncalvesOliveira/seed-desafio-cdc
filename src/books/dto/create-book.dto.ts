import { Length, Min, MinDate, IsNotEmpty } from 'class-validator';
import { Category } from '../../categories/categoty.entity';
import { Author } from '../../authors/author.entity';

export class CreateBookDto {
  @Length(1)
  titulo: string;

  sumario: string;

  @Length(1, 500)
  resume: string;

  @Min(20)
  preco: number;

  @Min(100)
  page: number;

  isbn: string;

  data_publicacao: Date;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  author: Author[];
}
