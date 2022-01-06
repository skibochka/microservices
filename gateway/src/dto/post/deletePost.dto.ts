import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class DeletePostInputDto {
  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
