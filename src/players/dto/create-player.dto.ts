import { ApiProperty } from '@nestjs/swagger';

import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'Stephen Curry',
    description: 'Nome do jogador',
  })
  @IsString({
    message: 'O nome deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O nome é obrigatório.',
  })
  @Length(3, 50, {
    message: 'O nome deve possuir entre 3 e 50 caracteres.',
  })
  name!: string;

  @ApiProperty({
    example: 30,
    description: 'Idade do jogador',
  })
  @IsInt({
    message: 'A idade deve ser um número inteiro.',
  })
  @Min(15, {
    message: 'A idade mínima é 15 anos.',
  })
  @Max(50, {
    message: 'A idade máxima é 50 anos.',
  })
  age!: number;

  @ApiProperty({
    example: 'PG',
    description: 'Posição do jogador',
    enum: ['PG', 'SG', 'SF', 'PF', 'C'],
  })
  @IsString({
    message: 'A posição deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A posição é obrigatória.',
  })
  @IsIn(['PG', 'SG', 'SF', 'PF', 'C'], {
    message: 'A posição deve ser PG, SG, SF, PF ou C.',
  })
  position!: string;

  @ApiProperty({
    example: 1,
    description: 'ID do time',
  })
  @IsInt({
    message: 'O ID do time deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'O ID do time deve ser maior que zero.',
  })
  teamId!: number;
}