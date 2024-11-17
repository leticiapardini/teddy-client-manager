import { UsersDto } from './../dtos/users.dto';
import { ConflictException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(newUser: UsersDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: newUser.username.trim().toLowerCase() },
    });
    if (existingUser) {
      throw new ConflictException('Usuário já existe');
    }
  
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds);
  
    const user = this.usersRepository.create({
      username: newUser.username.trim().toLowerCase(),
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsername(username.trim().toLowerCase());
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}