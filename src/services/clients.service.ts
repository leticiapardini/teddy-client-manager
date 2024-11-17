import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Clients } from '../entities/clients.entity'
import { User } from '../entities/user.entity'
import { CreateClientDto, UpdateClientDto } from '../dtos/clients.dto'
import { ERROR_MESSAGES } from '../constants/message.constants'

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientsRepository: Repository<Clients>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(clientData: CreateClientDto): Promise<Clients> {
    const user = await this.usersRepository.findOneBy({ id: clientData.userId })
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_EXIST)
    }
    const existingClient = await this.clientsRepository.findOne({ where: { name: clientData.name }})
    if (existingClient) {
      throw new ConflictException(ERROR_MESSAGES.CLIENT_ALREADY_EXISTS)
    }
    try {
      const { name, company, wage, userId } = clientData
      const client = this.clientsRepository.create({
        name,
        company,
        wage,
        user: { id: userId }
      })
      return this.clientsRepository.save(client)
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.CLIENT_CREATION_FAILED)
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Clients[]; total: number }> {
    const [data, total] = await this.clientsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })
    return { data, total }
  }

  async findOne(id: number): Promise<Clients> {
    return this.clientsRepository.findOne({ where: { id } })
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Clients> {
    const client = await this.findClientByIdOrFail(id)
    if (!client) throw new NotFoundException(ERROR_MESSAGES.CLIENT_NOT_FOUND)
    const updatedClient = this.clientsRepository.merge(client, updateClientDto)
    return this.clientsRepository.save(updatedClient)
  }

  async remove(id: number): Promise<void> {
    const client = await this.findClientByIdOrFail(id)
    if (!client) throw new NotFoundException(ERROR_MESSAGES.CLIENT_NOT_FOUND)
    await this.clientsRepository.delete(id)
  } 

  private async findClientByIdOrFail(id: number): Promise<Clients> {
    const client = await this.clientsRepository.findOne({ where: { id } })
    if (!client) {
      throw new NotFoundException(ERROR_MESSAGES.CLIENT_NOT_FOUND)
    }
    return client
  }
}

