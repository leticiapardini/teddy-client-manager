import { UsersDto } from './../dtos/users.dto'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ERROR_MESSAGES } from '../constants/message.constants'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username })
  }
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }

  async create(newUser: UsersDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: newUser.username },
    });
    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS)
    }
  
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds)
  
    const user = this.usersRepository.create({
      username: newUser.username,
      password: hashedPassword,
    })
    return this.usersRepository.save(user)
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsername(username)
    if (user && await bcrypt.compare(password, user.password)) {
      return user
    }
    return null
  }
}