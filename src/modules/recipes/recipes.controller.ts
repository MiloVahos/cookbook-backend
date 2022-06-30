import { Body, Controller, Post, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { BodyValidatorPipe } from 'src/pipes/bodyValidator.pipe';
import { CreateRecipeDTO } from './dto/CreateRecipe.dto';
import { CreateRecipeRequestDTO } from './dto/CreateRecipeRequest.dto';
import { RecipesService } from './recipes.service';
import { createRecipeSchema } from './schemas/createRecipeSchema';

@ApiTags('Recipes')
@UseGuards(AuthGuard('jwt'))
@Controller('recipes')
export class RecipesController {

  constructor(private readonly recipesService: RecipesService) {}

  @ApiOkResponse({ description: 'New recipe saved in the db' })
  @Post()
  @UsePipes(new BodyValidatorPipe(createRecipeSchema))
  async createRecipe(@Body() body: CreateRecipeRequestDTO, @Res() res): Promise<any> {
    const { title, description } = body;
    const createRecipeDto: CreateRecipeDTO = {
      author: res.locals.userName,
      authorId:  res.locals.userId,
      title,
      description,
    }
    res.send(await this.recipesService.createNewRecipe(createRecipeDto));
  }

}
