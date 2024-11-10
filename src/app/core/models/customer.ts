import { IsNotEmpty, Matches } from 'class-validator';

export class Customer {
  id?: number;

  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string = '';

  @IsNotEmpty({
    message: 'Mobile is required',
  })
  mobile: string = '';

  @IsNotEmpty({
    message: 'Birthday is required',
  })
  @Matches(/^\d{8}$/, {
    message: 'format is YYYYMMDD',
  })
  birthday: string = '';
}
