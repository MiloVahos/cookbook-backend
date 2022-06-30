import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(token: string): any {
    try {
      const decodedData = this.jwtService.decode(token.split(' ')[1]);
      return decodedData;
    } catch (error) {
      return null;
    }
  }

}
