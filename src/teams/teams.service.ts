import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from './team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  create(teamData: Partial<Team>) {
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
    await this.teamRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    const team = await this.findOne(id);

    if (!team) {
      throw new Error('Time não encontrado');
    }

    return this.teamRepository.remove(team);
  }
}