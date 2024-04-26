import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
  Session,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UniversitiesService } from './../universities/universities.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  repository: Repository<User>;

  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private universitiesService: UniversitiesService,
  ) {
    this.repository = repository;
  }

  async create(
    name: string,
    email: string,
    dob: string,
    password2: string,
    imageUrl: string,
    universityId: number,
  ) {
    // Hash the user's password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password2, salt, 32)) as Buffer;
    const password = salt + '.' + hash.toString('hex');

    const university = this.universitiesService.findOne(universityId);

    const user = this.repository.create({
      name,
      email,
      dob,
      password,
      imageUrl,
    });

    user.university = await university;
    console.log(user);
    return this.repository.save(user);
  }

  async signin(email: string, password: string) {
    const [user] = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('bad password!');
    }
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  findByEmail(email: string) {
    return this.repository.find({ where: { email } });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOneBy({ id });
  }

  findAll() {
    return this.repository.find();
  }

  async update_image(userId: number, url: string) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    user.imageUrl = url;
    return this.repository.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, attrs);
    return this.repository.save(user);
  }
}
