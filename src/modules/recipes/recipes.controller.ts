import { BadRequestException, Body, Controller, Post, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateRecipeDTO } from './dto/CreateRecipe.dto';
import { CreateRecipeRequestDTO } from './dto/CreateRecipeRequest.dto';
import { RecipesService } from './recipes.service';

@ApiTags('Recipes')
@UseGuards(AuthGuard('jwt'))
@Controller('recipes')
export class RecipesController {

  constructor(private readonly recipesService: RecipesService) {}

  @ApiOkResponse({ description: 'New recipe saved in the db' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createRecipe(@UploadedFile() file: Express.Multer.File, @Body() body: CreateRecipeRequestDTO, @Res() res): Promise<any> {
    const { title, description } = body;
    if (!title || !description) throw new BadRequestException('title and description are required')
    const location = await this.recipesService.saveRecipeFile(file);
    const createRecipeDto: CreateRecipeDTO = {
      author: res.locals.userName,
      authorId:  res.locals.userId,
      title,
      description,
      imgUrl: location,
    }
    const saveRecipeResult = await this.recipesService.createNewRecipe(createRecipeDto);
    res.send(saveRecipeResult);
  }

}
