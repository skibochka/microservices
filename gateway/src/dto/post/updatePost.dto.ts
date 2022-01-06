import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdatePostInputDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;
}
