import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

import { Player } from './player.entity';
import { Team } from '../teams/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}