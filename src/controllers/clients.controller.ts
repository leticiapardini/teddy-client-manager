import { Controller, Get, Post, Body, Param, Put, Delete, Query, ValidationPipe, UseGuards } from '@nestjs/common'
import { ClientsService } from '../services/clients.service'
import { Clients } from '../entities/clients.entity'
import { PaginationDto } from '../dtos/clients.dto'
import { CreateClientDto, UpdateClientDto } from '../dtos/clients.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query(new ValidationPipe({ transform: true })) paginationDto: PaginationDto) {
    const { page, limit } = paginationDto
    return this.clientsService.findAll(page, limit)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Clients> {
    return this.clientsService.findOne(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    clientData: UpdateClientDto,
  ) {
    return this.clientsService.update(id, clientData)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return this.clientsService.remove(id)
  }
}