import { ApiProperty } from '@nestjs/swagger';

import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class UpdatePlayerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(15)
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsInt()
  teamId: number;
}