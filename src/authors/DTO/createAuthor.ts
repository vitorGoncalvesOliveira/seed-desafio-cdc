import { IsEmail, IsNotEmpty } from 'class-validator';

export default class Author {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  descricao: string;
}
