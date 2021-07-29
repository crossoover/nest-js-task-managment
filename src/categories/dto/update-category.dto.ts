/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  base64Image: string;
}
