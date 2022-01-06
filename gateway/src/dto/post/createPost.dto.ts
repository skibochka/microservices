import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostInputDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
