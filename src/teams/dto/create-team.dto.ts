import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Los Angeles Lakers',
    description: 'Nome do time',
  })
  @IsString({
    message: 'O nome deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O nome do time é obrigatório.',
  })
  @Length(3, 40, {
    message: 'O nome deve possuir entre 3 e 40 caracteres.',
  })
  name!: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'Cidade do time',
  })
  @IsString({
    message: 'A cidade deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A cidade é obrigatória.',
  })
  @Length(3, 40, {
    message: 'A cidade deve possuir entre 3 e 40 caracteres.',
  })
  city!: string;

  @ApiProperty({
    example: 'JJ Redick',
    description: 'Nome do treinador',
  })
  @IsString({
    message: 'O treinador deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O treinador é obrigatório.',
  })
  @Length(3, 50, {
    message: 'O nome do treinador deve possuir entre 3 e 50 caracteres.',
  })
  coach!: string;
}