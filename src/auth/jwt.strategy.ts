import { UsersService } from './../services/user.service'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { ERROR_MESSAGES } from '../constants/message.constants'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'TesteDesafioTeddy',
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub)
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)
    }
    return user
  }
}
