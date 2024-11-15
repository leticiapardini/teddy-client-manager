import { UsersDto } from './../dtos/users.dto';
import { HttpStatus, Injectable, Res } from '@nestjs/common';
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

  async createUser(newUser: UsersDto, response: Response) {
    try {
      const { username, password } = newUser;
      const user = await this.usersRepository.findOne({
        where: { username: username.trim().toLowerCase() },
      });
      if (user !== null) {
        console.log(user, 'user');
        response.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuário já existe' });
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      if (hash) {
        await this.usersRepository.save({
          username: username.trim().toLowerCase(),
          password: hash,
        });
        return response.status(HttpStatus.CREATED).json({ username });
      }
    } catch (error) {
      return response.status(HttpStatus.EXPECTATION_FAILED).json(error);
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsername(username.trim().toLowerCase());
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}