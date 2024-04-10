import { Expose } from 'class-transformer';
import { University } from 'src/universities/university.entity';

export class UserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  dob: string;

  @Expose()
  imageUrl: string;

  @Expose()
  university: University;
}
