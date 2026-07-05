import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

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
    const team = await this.teamRepository.findOne({
      where: {
        id: data.teamId,
      },
      relations: ['players'],
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado.');
    }

    if (team.players.length >= 15) {
      throw new BadRequestException(
        'Este time já possui o limite máximo de 15 jogadores.',
      );
    }

    const player = this.playerRepository.create({
      name: data.name.trim(),
      age: data.age,
      position: data.position.trim(),
      team,
    });

    return this.playerRepository.save(player);
  }

  async findAll() {
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.team', 'team')
      .select([
        'player.id',
        'player.name',
        'player.age',
        'player.position',
        'team.id',
        'team.name',
      ])
      .getMany();
  }

  async findByTeam(teamId: number) {
    return this.playerRepository.find({
      where: {
        team: {
          id: teamId,
        },
      },
      relations: ['team'],
    });
  }

  async findOne(id: number) {
    return this.playerRepository.findOne({
      where: {
        id,
      },
      relations: ['team'],
    });
  }

  async update(id: number, data: any) {
    const player = await this.findOne(id);

    if (!player) {
      throw new NotFoundException('Jogador não encontrado.');
    }

    const team = await this.teamRepository.findOne({
      where: {
        id: data.teamId,
      },
      relations: ['players'],
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado.');
    }

    if (
      player.team.id !== team.id &&
      team.players.length >= 15
    ) {
      throw new BadRequestException(
        'Este time já possui o limite máximo de 15 jogadores.',
      );
    }

    player.name = data.name.trim();
    player.age = data.age;
    player.position = data.position.trim();
    player.team = team;

    return this.playerRepository.save(player);
  }

  async remove(id: number) {
    const player = await this.findOne(id);

    if (!player) {
      throw new NotFoundException('Jogador não encontrado.');
    }

    return this.playerRepository.remove(player);
  }

  async averageAge() {
    const result = await this.playerRepository
      .createQueryBuilder('player')
      .select('AVG(player.age)', 'average')
      .getRawOne();

    return {
      averageAge: Number(result.average) || 0,
    };
  }
}