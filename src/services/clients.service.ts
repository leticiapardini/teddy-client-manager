import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from '../entities/clients.entity';
import { User } from '../entities/user.entity';
import { CreateClientDto, UpdateClientDto } from '../dtos/clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    @InjectRepository(User)
    private clientsRepository: Repository<Clients>,
  ) {}

  async create(clientData: CreateClientDto): Promise<Clients> {
    const existingClient = await this.clientsRepository.findOne({ where: { name: clientData.name } })
    if (existingClient) {
      throw new ConflictException('Cliente já está cadastrado.')
    }
    try {
      const client = this.clientsRepository.create(clientData)
      return await this.clientsRepository.save(client)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar cliente.')
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Clients[]; total: number }> {
    const [data, total] = await this.clientsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })
    return { data, total };
  }

  async findOne(id: number): Promise<Clients> {
    return this.clientsRepository.findOne({ where: { id } })
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Clients> {
    const client = await this.findClientByIdOrFail(id)
    if (!client) throw new NotFoundException('Cliente não encontrado')
    const updatedClient = this.clientsRepository.merge(client, updateClientDto)
    return this.clientsRepository.save(updatedClient);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findClientByIdOrFail(id)
    if (!client) throw new NotFoundException('Cliente não encontrado')
    await this.clientsRepository.delete(id)
  } 

  private async findClientByIdOrFail(id: number): Promise<Clients> {
    const client = await this.clientsRepository.findOne({ where: { id } })
    if (!client) {
      throw new NotFoundException('Cliente não encontrado')
    }
    return client
  }
}

