import {
  IsString,
  IsOptional,
  IsNotEmpty,
  isInt,
  IsInt,
} from "class-validator";
export class CreateBlogDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

}
