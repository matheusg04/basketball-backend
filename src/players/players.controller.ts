import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { PlayersService } from './players.service';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
  ) {}

  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get('stats/average-age')
  averageAge() {
    return this.playersService.averageAge();
  }

  @Get('team/:id')
  findByTeam(@Param('id') id: string) {
    return this.playersService.findByTeam(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePlayerDto,
  ) {
    return this.playersService.update(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(Number(id));
  }
}