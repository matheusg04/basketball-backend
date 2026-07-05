import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from './team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(teamData: Partial<Team>) {
    teamData.name = teamData.name?.trim();
    teamData.city = teamData.city?.trim();
    teamData.coach = teamData.coach?.trim();

    if (!teamData.name || !teamData.city || !teamData.coach) {
      throw new BadRequestException(
        'Nome, cidade e treinador são obrigatórios.',
      );
    }

    const team = this.teamRepository.create(teamData);

    return this.teamRepository.save(team);
  }

  findAll() {
    return this.teamRepository.find();
  }

  findOne(id: number) {
    return this.teamRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Team>) {
    const team = await this.findOne(id);

    if (!team) {
      throw new NotFoundException('Time não encontrado.');
    }

    data.name = data.name?.trim();
    data.city = data.city?.trim();
    data.coach = data.coach?.trim();

    if (!data.name || !data.city || !data.coach) {
      throw new BadRequestException(
        'Nome, cidade e treinador são obrigatórios.',
      );
    }

    await this.teamRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    const team = await this.findOne(id);

    if (!team) {
      throw new NotFoundException('Time não encontrado.');
    }

    try {
      return await this.teamRepository.remove(team);
    } catch {
      throw new BadRequestException(
        'Não é possível excluir um time que possui jogadores cadastrados.',
      );
    }
  }
}