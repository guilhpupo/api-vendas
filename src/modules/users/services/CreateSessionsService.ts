import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
