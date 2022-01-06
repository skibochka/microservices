import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class getPostsInputDto {
  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  skip: number;

  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  page: number;
}
