import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { Clients } from '../entities/clients.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() clientData: Partial<Clients>): Promise<Clients> {
    return this.clientsService.create(clientData);
  }

  @Get()
  async findAll(): Promise<Clients[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Clients> {
    return this.clientsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() clientData: Partial<Clients>,
  ): Promise<Clients> {
    return this.clientsService.update(id, clientData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.clientsService.remove(id);
  }
}