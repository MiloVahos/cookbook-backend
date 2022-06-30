import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeRequestDTO {
  @ApiProperty({ description: 'Title of the recipe' })
  title: string;
  @ApiProperty({ description: 'Description of the recipe' })
  description: string;
}