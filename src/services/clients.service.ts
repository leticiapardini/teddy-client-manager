import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from '../entities/clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientsRepository: Repository<Clients>,
  ) {}

  // Create a new client
  async create(clientData: Partial<Clients>): Promise<Clients> {
    const client = this.clientsRepository.create(clientData);
    return this.clientsRepository.save(client);
  }

  // Get all clients
  async findAll(): Promise<Clients[]> {
    return this.clientsRepository.find();
  }

  // Get one client by ID
  async findOne(id: number): Promise<Clients> {
    return this.clientsRepository.findOne({ where: { id } });
  }

  // Update a client
  async update(id: number, clientData: Partial<Clients>): Promise<Clients> {
    await this.clientsRepository.update(id, clientData);
    return this.findOne(id);
  }

  // Delete a client
  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}