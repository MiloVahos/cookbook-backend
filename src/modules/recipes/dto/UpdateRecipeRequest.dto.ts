import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeRequestDTO {
  @ApiProperty({ description: 'Title of the recipe' })
  title: string;
  @ApiProperty({ description: 'Description of the recipe' })
  description: string;
}