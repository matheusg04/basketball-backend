import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Player } from './player.entity';
import { Team } from '../teams/team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(data: any) {
    const team = await this.teamRepository.findOneBy({
      id: data.teamId,
    });

    if (!team) {
      throw new Error('Time não encontrado');
    }

    const player = this.playerRepository.create({
      name: data.name,
      age: data.age,
      position: data.position,
      team: team,
    });

    return this.playerRepository.save(player);
  }

  findAll() {
    return this.playerRepository.find({
      relations: ['team'],
    });
  }

  findByTeam(teamId: number) {
    return this.playerRepository.find({
      where: {
        team: {
          id: teamId,
        },
      },
      relations: ['team'],
    });
  }

  findOne(id: number) {
    return this.playerRepository.findOne({
      where: { id },
      relations: ['team'],
    });
  }

  async update(id: number, data: any) {
    const player = await this.findOne(id);

    if (!player) {
      throw new Error('Jogador não encontrado');
    }

    const team = await this.teamRepository.findOneBy({
      id: data.teamId,
    });

    if (!team) {
      throw new Error('Time não encontrado');
    }

    player.name = data.name;
    player.age = data.age;
    player.position = data.position;
    player.team = team;

    return this.playerRepository.save(player);
  }

  async remove(id: number) {
    const player = await this.findOne(id);

    if (!player) {
      throw new Error('Jogador não encontrado');
    }

    return this.playerRepository.remove(player);
  }

  async averageAge() {
    const players = await this.playerRepository.find();

    const totalAge = players.reduce(
      (sum, player) => sum + player.age,
      0,
    );

    const average =
      players.length > 0
        ? totalAge / players.length
        : 0;

    return {
      averageAge: average,
    };
  }
}