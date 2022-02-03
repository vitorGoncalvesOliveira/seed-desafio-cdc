import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  descricao: string;
}
