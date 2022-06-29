import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserRequestDTO } from './dto/createUserRequest.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<User> {
    const { name, email, password } = createUserRequestDTO;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user: User = { name, email, password: encryptedPassword };
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

}
