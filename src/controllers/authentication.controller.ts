import { Credentials, JWT_SECRET } from './../auth';
import { Request, RestBindings, get, ResponseObject, post, requestBody, HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/context';
import { secured, SecuredType } from '../auth';
import { promisify } from 'util';
import { repository, Filter } from '@loopback/repository';
import { UserRepository, UserRoleRepository } from '../repositories';

const { sign } = require('jsonwebtoken');
const signAsync = promisify(sign);

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository) private userRoleRepository: UserRoleRepository,
  ) { }

  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    const user = await this.userRepository.findOne({ where: { id: credentials.username } } as Filter);
    if (!user) throw new HttpErrors.Unauthorized('Invalid Credentials');

    const isPasswordMatched = user.password === credentials.password;
    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Invalid credentials');

    const tokenObject = { username: credentials.username };
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.userRoleRepository.find({ where: { userId: user.id } } as Filter);
    const { id, email } = user;

    return {
      token,
      id: id,
      email,
      roles: roles.map(r => r.roleId),
    };
  }
}
