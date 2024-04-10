import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.repository.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOneBy({ id });
  }

  async update(id: number, url: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    user.imageUrl = url;
    return this.repository.save(user);
  }
}
